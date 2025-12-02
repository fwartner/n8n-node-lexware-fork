import { IExecuteFunctions } from "n8n-core";
import {
  IDataObject,
  INodeExecutionData,
  NodeOperationError,
} from "n8n-workflow";
import {
  lexwareApiRequest,
  lexwareApiDownload,
} from "../GenericFunctions";
import { parseLineItemsFromJson } from "../utils/LineItems";
import { formatToLexwareDate } from "../utils/date";

function buildCreditNoteBody(
  getParam: (name: string, index?: number, defaultValue?: unknown) => unknown,
  i: number
): IDataObject {
  const title = (getParam("title", i, "") as string) || "";
  const introduction = (getParam("introduction", i, "") as string) || "";
  const remark = (getParam("remark", i, "") as string) || "";
  const voucherDateRaw = (getParam("voucherDate", i, "") as string) || "";
  const voucherDate = formatToLexwareDate(voucherDateRaw);
  const contactId = (getParam("contactId", i, "") as string) || "";
  const language = (getParam("language", i, "de") as string) || "de";

  const rawItems = (getParam("lineItems.item", i, []) as IDataObject[]) || [];
  const lineItems = Array.isArray(rawItems)
    ? rawItems.map((it) => {
        const unit = (it.unitPrice as IDataObject)?.value as
          | IDataObject
          | undefined;
        const quantity = (it.quantity as number) ?? 1;
        const net = (unit?.netAmount as number) ?? 0;
        const rate = (unit?.taxRatePercentage as number) ?? 0;
        const gross = (unit?.grossAmount as number) ?? net * (1 + rate / 100);
        const cleaned: IDataObject = {
          type: it.type || "custom",
          name: it.name,
          description: it.description,
          quantity,
          unitName: it.unitName,
          unitPrice: unit
            ? {
                currency: unit.currency,
                netAmount: unit.netAmount,
                grossAmount: unit.grossAmount ?? gross,
                taxRatePercentage: unit.taxRatePercentage,
              }
            : undefined,
          discountPercentage: it.discountPercentage,
        };
        if (it.lineItemAmount !== null && it.lineItemAmount !== undefined) {
          cleaned.lineItemAmount = it.lineItemAmount;
        }
        return cleaned;
      })
    : [];

  const body: IDataObject = {
    title,
    introduction: introduction || undefined,
    remark: remark || undefined,
    voucherDate,
    address: contactId ? { contactId } : undefined,
    lineItems,
    language,
  };

  const totalPriceVal = getParam("totalPrice.value", i, {}) as IDataObject;
  if (totalPriceVal && Object.keys(totalPriceVal).length) {
    body.totalPrice = totalPriceVal;
  } else {
    const currency =
      (lineItems[0]?.unitPrice as IDataObject | undefined)?.currency ?? "EUR";
    let totalNetAmount = 0;
    let totalGrossAmount = 0;
    for (const li of lineItems) {
      const q = (li.quantity as number) ?? 1;
      const up = li.unitPrice as IDataObject | undefined;
      const net = (up?.netAmount as number) ?? 0;
      const gross = (up?.grossAmount as number) ?? 0;
      totalNetAmount += net * q;
      totalGrossAmount += (gross || net) * q;
    }
    const totalTaxAmount = Math.max(totalGrossAmount - totalNetAmount, 0);
    body.totalPrice = {
      currency,
      totalNetAmount,
      totalGrossAmount,
      totalTaxAmount,
    } as IDataObject;
  }

  const taxConditionsVal = getParam(
    "taxConditions.value",
    i,
    {}
  ) as IDataObject;
  if (taxConditionsVal && Object.keys(taxConditionsVal).length) {
    body.taxConditions = taxConditionsVal;
  } else {
    body.taxConditions = { taxType: "net", taxTypeNote: "" };
  }

  const shippingConditionsVal = getParam(
    "shippingConditions.value",
    i,
    {}
  ) as IDataObject;
  if (shippingConditionsVal && Object.keys(shippingConditionsVal).length) {
    body.shippingConditions = shippingConditionsVal;
  } else {
    body.shippingConditions = {
      shippingType: "delivery",
      shippingDate: voucherDate || undefined,
    } as IDataObject;
  }

  const paymentConditionsVal = getParam(
    "paymentConditions.value",
    i,
    {}
  ) as IDataObject;
  if (paymentConditionsVal && Object.keys(paymentConditionsVal).length) {
    const discount = (
      paymentConditionsVal.paymentDiscountConditions as IDataObject | undefined
    )?.value as IDataObject | undefined;
    body.paymentConditions = {
      paymentTermLabel: paymentConditionsVal.paymentTermLabel,
      paymentTermDuration: paymentConditionsVal.paymentTermDuration,
      paymentDiscountConditions: discount
        ? {
            discountPercentage: discount.discountPercentage,
            discountRange: discount.discountRange,
          }
        : undefined,
    } as IDataObject;
  }

  return body;
}

export async function executeCreditNotes(
  this: IExecuteFunctions,
  i: number,
  operation: string
): Promise<INodeExecutionData[]> {
  let responseData: any;

  switch (operation) {
    case "create": {
      const getParam = (name: string, index?: number, def?: unknown) =>
        (
          this.getNodeParameter as unknown as (
            name: string,
            index?: number,
            defaultValue?: unknown
          ) => unknown
        )(name, index, def);
      const creditNote = buildCreditNoteBody(getParam, i);
      const finalize = this.getNodeParameter("finalize", i, false) as boolean;
      responseData = await lexwareApiRequest.call(
        this,
        "POST",
        finalize ? "/v1/credit-notes?finalize=true" : "/v1/credit-notes",
        creditNote
      );
      break;
    }

    case "createByJson": {
      const getParam = (name: string, index?: number, def?: unknown) =>
        (
          this.getNodeParameter as unknown as (
            name: string,
            index?: number,
            defaultValue?: unknown
          ) => unknown
        )(name, index, def);
      const standard = buildCreditNoteBody(getParam, i);
      const lineItemsJson = this.getNodeParameter(
        "lineItemsJson",
        i,
        "[]"
      ) as string;
      const jsonItems = parseLineItemsFromJson(lineItemsJson);
      const body = { ...standard, lineItems: jsonItems } as IDataObject;
      const finalize = this.getNodeParameter("finalize", i, false) as boolean;
      responseData = await lexwareApiRequest.call(
        this,
        "POST",
        finalize ? "/v1/credit-notes?finalize=true" : "/v1/credit-notes",
        body
      );
      break;
    }

    case "get": {
      const creditNoteId = this.getNodeParameter("creditNoteId", i) as string;
      responseData = await lexwareApiRequest.call(
        this,
        "GET",
        `/v1/credit-notes/${creditNoteId}`
      );
      break;
    }

    case "getAll": {
      const page = this.getNodeParameter("page", i, 0) as number;
      const size = this.getNodeParameter("size", i, 25) as number;
      const voucherStatus = this.getNodeParameter(
        "voucherStatus",
        i,
        ""
      ) as string;
      const qs: IDataObject = { page, size };
      if (voucherStatus) qs.voucherStatus = voucherStatus;
      responseData = await lexwareApiRequest.call(
        this,
        "GET",
        "/v1/credit-notes",
        {},
        qs
      );
      break;
    }

    case "pursue": {
      const creditNoteId = this.getNodeParameter("creditNoteId", i) as string;
      const precedeStep = this.getNodeParameter("precedeStep", i) as string;
      const precedingSalesVoucherId = this.getNodeParameter(
        "precedingSalesVoucherId",
        i
      ) as string;
      
      const body: IDataObject = {
        precedeStep,
        precedingSalesVoucherId,
      };
      
      responseData = await lexwareApiRequest.call(
        this,
        "POST",
        `/v1/credit-notes/${creditNoteId}/pursue`,
        body
      );
      break;
    }

    case "renderPdf": {
      const creditNoteId = this.getNodeParameter("creditNoteId", i) as string;
      responseData = await lexwareApiRequest.call(
        this,
        "GET",
        `/v1/credit-notes/${creditNoteId}/document`
      );
      break;
    }

    case "downloadFile": {
      const creditNoteId = this.getNodeParameter("creditNoteId", i) as string;
      const fileId = this.getNodeParameter("fileId", i) as string;
      const response = await lexwareApiDownload.call(
        this,
        `/v1/credit-notes/${creditNoteId}/files/${fileId}`
      );
      
      const binaryData = await this.helpers.prepareBinaryData(
        response.body as Buffer,
        `credit-note-${creditNoteId}.pdf`,
        "application/pdf"
      );
      
      return [{ json: {}, binary: { data: binaryData } }];
    }

    default:
      throw new NodeOperationError(
        this.getNode(),
        `Unsupported operation: ${operation}`
      );
  }

  const items = Array.isArray(responseData) ? responseData : [responseData];
  return items.map((data) => ({ json: data }));
}

