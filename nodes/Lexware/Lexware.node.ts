import { IExecuteFunctions } from "n8n-core";
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";

import {
  articlesFields,
  articlesOperations,
} from "./descriptions/ArticlesDescription";
import {
  contactsFields,
  contactsOperations,
} from "./descriptions/ContactsDescription";
import {
  countriesFields,
  countriesOperations,
} from "./descriptions/CountriesDescription";
import {
  creditNotesFields,
  creditNotesOperations,
} from "./descriptions/CreditNotesDescription";
import {
  deliveryNotesFields,
  deliveryNotesOperations,
} from "./descriptions/DeliveryNotesDescription";
import {
  downPaymentInvoicesFields,
  downPaymentInvoicesOperations,
} from "./descriptions/DownPaymentInvoicesDescription";
import {
  dunningsFields,
  dunningsOperations,
} from "./descriptions/DunningsDescription";
import {
  eventSubscriptionsFields,
  eventSubscriptionsOperations,
} from "./descriptions/EventSubscriptionsDescription";
import { filesFields, filesOperations } from "./descriptions/FilesDescription";
import {
  invoicesFields,
  invoicesOperations,
} from "./descriptions/InvoicesDescription";
import {
  orderConfirmationsFields,
  orderConfirmationsOperations,
} from "./descriptions/OrderConfirmationsDescription";
import {
  paymentsFields,
  paymentsOperations,
} from "./descriptions/PaymentsDescription";
import {
  paymentConditionsFields,
  paymentConditionsOperations,
} from "./descriptions/PaymentConditionsDescription";
import {
  postingCategoriesFields,
  postingCategoriesOperations,
} from "./descriptions/PostingCategoriesDescription";
import {
  printLayoutsFields,
  printLayoutsOperations,
} from "./descriptions/PrintLayoutsDescription";
import {
  profileFields,
  profileOperations,
} from "./descriptions/ProfileDescription";
import {
  quotationsFields,
  quotationsOperations,
} from "./descriptions/QuotationsDescription";
import {
  recurringTemplatesFields,
  recurringTemplatesOperations,
} from "./descriptions/RecurringTemplatesDescription";
import {
  voucherListsFields,
  voucherListsOperations,
} from "./descriptions/VoucherListsDescription";
import {
  vouchersFields,
  vouchersOperations,
} from "./descriptions/VouchersDescription";

import { executeArticles } from "./actions/Articles.execute";
import { executeContacts } from "./actions/Contacts.execute";
import { executeCountries } from "./actions/Countries.execute";
import { executeCreditNotes } from "./actions/CreditNotes.execute";
import { executeDeliveryNotes } from "./actions/DeliveryNotes.execute";
import { executeDownPaymentInvoices } from "./actions/DownPaymentInvoices.execute";
import { executeDunnings } from "./actions/Dunnings.execute";
import { executeEventSubscriptions } from "./actions/EventSubscriptions.execute";
import { executeFiles } from "./actions/Files.execute";
import { executeInvoices } from "./actions/Invoices.execute";
import { executeOrderConfirmations } from "./actions/OrderConfirmations.execute";
import { executePayments } from "./actions/Payments.execute";
import { executePaymentConditions } from "./actions/PaymentConditions.execute";
import { executePostingCategories } from "./actions/PostingCategories.execute";
import { executePrintLayouts } from "./actions/PrintLayouts.execute";
import { executeProfile } from "./actions/Profile.execute";
import { executeQuotations } from "./actions/Quotations.execute";
import { executeRecurringTemplates } from "./actions/RecurringTemplates.execute";
import { executeVoucherLists } from "./actions/VoucherLists.execute";
import { executeVouchers } from "./actions/Vouchers.execute";

export class Lexware implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Lexware",
    name: "lexware",
    icon: "file:lexware.svg",
    group: ["transform"],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: "Interact with the Lexware API",
    defaults: {
      name: "Lexware",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [
      {
        name: "lexwareApi",
        required: true,
      },
    ],
    properties: [
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
        options: [
          { name: "Articles", value: "articles" },
          { name: "Contacts", value: "contacts" },
          { name: "Countries", value: "countries" },
          { name: "Credit Notes", value: "creditNotes" },
          { name: "Delivery Notes", value: "deliveryNotes" },
          { name: "Down Payment Invoices", value: "downPaymentInvoices" },
          { name: "Dunnings", value: "dunnings" },
          { name: "Event Subscriptions", value: "eventSubscriptions" },
          { name: "Files", value: "files" },
          { name: "Invoices", value: "invoices" },
          { name: "Order Confirmations", value: "orderConfirmations" },
          { name: "Payment Conditions", value: "paymentConditions" },
          { name: "Payments", value: "payments" },
          { name: "Posting Categories", value: "postingCategories" },
          { name: "Print Layouts", value: "printLayouts" },
          { name: "Profile", value: "profile" },
          { name: "Quotations", value: "quotations" },
          { name: "Recurring Templates", value: "recurringTemplates" },
          { name: "Voucher Lists", value: "voucherLists" },
          { name: "Vouchers", value: "vouchers" },
        ],
        default: "articles",
      },
      articlesOperations,
      ...articlesFields,
      contactsOperations,
      ...contactsFields,
      countriesOperations,
      ...countriesFields,
      creditNotesOperations,
      ...creditNotesFields,
      deliveryNotesOperations,
      ...deliveryNotesFields,
      downPaymentInvoicesOperations,
      ...downPaymentInvoicesFields,
      dunningsOperations,
      ...dunningsFields,
      eventSubscriptionsOperations,
      ...eventSubscriptionsFields,
      filesOperations,
      ...filesFields,
      invoicesOperations,
      ...invoicesFields,
      orderConfirmationsOperations,
      ...orderConfirmationsFields,
      paymentsOperations,
      ...paymentsFields,
      paymentConditionsOperations,
      ...paymentConditionsFields,
      postingCategoriesOperations,
      ...postingCategoriesFields,
      printLayoutsOperations,
      ...printLayoutsFields,
      profileOperations,
      ...profileFields,
      quotationsOperations,
      ...quotationsFields,
      recurringTemplatesOperations,
      ...recurringTemplatesFields,
      voucherListsOperations,
      ...voucherListsFields,
      vouchersOperations,
      ...vouchersFields,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter("resource", 0) as string;
    const operation = this.getNodeParameter("operation", 0) as string;
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      switch (resource) {
        case "articles":
          returnData.push(...(await executeArticles.call(this, i, operation)));
          break;
        case "contacts":
          returnData.push(...(await executeContacts.call(this, i, operation)));
          break;
        case "countries":
          returnData.push(...(await executeCountries.call(this, i, operation)));
          break;
        case "creditNotes":
          returnData.push(...(await executeCreditNotes.call(this, i, operation)));
          break;
        case "deliveryNotes":
          returnData.push(...(await executeDeliveryNotes.call(this, i, operation)));
          break;
        case "downPaymentInvoices":
          returnData.push(...(await executeDownPaymentInvoices.call(this, i, operation)));
          break;
        case "dunnings":
          returnData.push(...(await executeDunnings.call(this, i, operation)));
          break;
        case "eventSubscriptions":
          returnData.push(...(await executeEventSubscriptions.call(this, i, operation)));
          break;
        case "files":
          returnData.push(...(await executeFiles.call(this, i, operation)));
          break;
        case "invoices":
          returnData.push(...(await executeInvoices.call(this, i, operation)));
          break;
        case "orderConfirmations":
          returnData.push(
            ...(await executeOrderConfirmations.call(this, i, operation))
          );
          break;
        case "payments":
          returnData.push(...(await executePayments.call(this, i, operation)));
          break;
        case "paymentConditions":
          returnData.push(...(await executePaymentConditions.call(this, i, operation)));
          break;
        case "postingCategories":
          returnData.push(...(await executePostingCategories.call(this, i, operation)));
          break;
        case "printLayouts":
          returnData.push(
            ...(await executePrintLayouts.call(this, i, operation))
          );
          break;
        case "profile":
          returnData.push(...(await executeProfile.call(this, i, operation)));
          break;
        case "quotations":
          returnData.push(
            ...(await executeQuotations.call(this, i, operation))
          );
          break;
        case "recurringTemplates":
          returnData.push(...(await executeRecurringTemplates.call(this, i, operation)));
          break;
        case "voucherLists":
          returnData.push(
            ...(await executeVoucherLists.call(this, i, operation))
          );
          break;
        case "vouchers":
          returnData.push(...(await executeVouchers.call(this, i, operation)));
          break;
        default:
          throw new Error(`Unsupported resource: ${resource}`);
      }
    }

    return [returnData];
  }
}
