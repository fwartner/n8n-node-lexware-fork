import { IExecuteFunctions } from "n8n-core";
import {
  INodeExecutionData,
  NodeOperationError,
} from "n8n-workflow";
import {
  lexwareApiRequest,
  lexwareApiDownload,
} from "../GenericFunctions";

export async function executeDownPaymentInvoices(
  this: IExecuteFunctions,
  i: number,
  operation: string
): Promise<INodeExecutionData[]> {
  let responseData: any;

  switch (operation) {
    case "get": {
      const downPaymentInvoiceId = this.getNodeParameter(
        "downPaymentInvoiceId",
        i
      ) as string;
      responseData = await lexwareApiRequest.call(
        this,
        "GET",
        `/v1/down-payment-invoices/${downPaymentInvoiceId}`
      );
      break;
    }

    case "downloadFile": {
      const downPaymentInvoiceId = this.getNodeParameter(
        "downPaymentInvoiceId",
        i
      ) as string;
      const fileId = this.getNodeParameter("fileId", i) as string;
      const response = await lexwareApiDownload.call(
        this,
        `/v1/down-payment-invoices/${downPaymentInvoiceId}/files/${fileId}`
      );

      const binaryData = await this.helpers.prepareBinaryData(
        response.body as Buffer,
        `down-payment-invoice-${downPaymentInvoiceId}.pdf`,
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

