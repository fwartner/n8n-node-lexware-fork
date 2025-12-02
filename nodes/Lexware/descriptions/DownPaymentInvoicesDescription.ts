import { INodeProperties } from "n8n-workflow";

export const downPaymentInvoicesOperations: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["downPaymentInvoices"],
    },
  },
  options: [
    {
      name: "Get",
      value: "get",
      description: "Get a down payment invoice by ID",
      action: "Get a down payment invoice",
    },
    {
      name: "Download File",
      value: "downloadFile",
      description: "Download a down payment invoice file",
      action: "Download down payment invoice file",
    },
  ],
  default: "get",
};

export const downPaymentInvoicesFields: INodeProperties[] = [
  {
    displayName: "Down Payment Invoice ID",
    name: "downPaymentInvoiceId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["downPaymentInvoices"],
        operation: ["get", "downloadFile"],
      },
    },
    description: "ID of the down payment invoice",
  },
  {
    displayName: "File ID",
    name: "fileId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["downPaymentInvoices"],
        operation: ["downloadFile"],
      },
    },
    description: "ID of the file to download",
  },
];

