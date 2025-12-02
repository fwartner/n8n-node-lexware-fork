import { INodeProperties } from "n8n-workflow";

export const paymentsOperations: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["payments"],
    },
  },
  options: [
    {
      name: "Get",
      value: "get",
      description: "Get payment information for a voucher",
      action: "Get payment information",
    },
  ],
  default: "get",
};

export const paymentsFields: INodeProperties[] = [
  {
    displayName: "Voucher Type",
    name: "voucherType",
    type: "options",
    options: [
      { name: "Sales Invoice", value: "salesinvoice" },
      { name: "Sales Credit Note", value: "salescreditnote" },
      { name: "Purchase Invoice", value: "purchaseinvoice" },
      { name: "Purchase Credit Note", value: "purchasecreditnote" },
    ],
    default: "salesinvoice",
    required: true,
    displayOptions: {
      show: {
        resource: ["payments"],
        operation: ["get"],
      },
    },
    description: "Type of voucher to get payment information for",
  },
  {
    displayName: "Voucher ID",
    name: "voucherId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["payments"],
        operation: ["get"],
      },
    },
    description: "ID of the voucher",
  },
];

