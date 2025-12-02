import { INodeProperties } from "n8n-workflow";

export const creditNotesOperations: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["creditNotes"],
    },
  },
  options: [
    {
      name: "Create",
      value: "create",
      description: "Create a new credit note",
      action: "Create a credit note",
    },
    {
      name: "Create by JSON",
      value: "createByJson",
      description: "Create a credit note using JSON line items",
      action: "Create a credit note by JSON",
    },
    {
      name: "Get",
      value: "get",
      description: "Get a credit note by ID",
      action: "Get a credit note",
    },
    {
      name: "Get All",
      value: "getAll",
      description: "Get all credit notes",
      action: "Get all credit notes",
    },
    {
      name: "Pursue",
      value: "pursue",
      description: "Pursue a credit note to create a follow-up document",
      action: "Pursue a credit note",
    },
    {
      name: "Render PDF",
      value: "renderPdf",
      description: "Render a credit note as PDF",
      action: "Render credit note PDF",
    },
    {
      name: "Download File",
      value: "downloadFile",
      description: "Download a credit note file",
      action: "Download credit note file",
    },
  ],
  default: "create",
};

export const creditNotesFields: INodeProperties[] = [
  // Create operation fields
  {
    displayName: "Title",
    name: "title",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["create", "createByJson"],
      },
    },
    description: "Title of the credit note",
  },
  {
    displayName: "Introduction",
    name: "introduction",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["create", "createByJson"],
      },
    },
    description: "Introduction text for the credit note",
  },
  {
    displayName: "Remark",
    name: "remark",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["create", "createByJson"],
      },
    },
    description: "Closing remark for the credit note",
  },
  {
    displayName: "Voucher Date",
    name: "voucherDate",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["create", "createByJson"],
      },
    },
    description: 'Date of the credit note in ISO 8601 format (e.g., "2024-01-15")',
  },
  {
    displayName: "Contact ID",
    name: "contactId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["create", "createByJson"],
      },
    },
    description: "ID of the contact (customer)",
  },
  {
    displayName: "Language",
    name: "language",
    type: "options",
    options: [
      { name: "German", value: "de" },
      { name: "English", value: "en" },
    ],
    default: "de",
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["create", "createByJson"],
      },
    },
    description: "Language of the credit note",
  },
  {
    displayName: "Finalize",
    name: "finalize",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["create", "createByJson"],
      },
    },
    description:
      "Whether to finalize the credit note immediately (set voucherStatus to open)",
  },
  {
    displayName: "Line Items",
    name: "lineItems",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["create"],
      },
    },
    placeholder: "Add Line Item",
    options: [
      {
        name: "item",
        displayName: "Line Item",
        values: [
          {
            displayName: "Type",
            name: "type",
            type: "options",
            options: [
              { name: "Custom", value: "custom" },
              { name: "Text", value: "text" },
              { name: "Material", value: "material" },
              { name: "Service", value: "service" },
            ],
            default: "custom",
            description: "Type of line item",
          },
          {
            displayName: "Name",
            name: "name",
            type: "string",
            default: "",
            description: "Name/title of the line item",
          },
          {
            displayName: "Description",
            name: "description",
            type: "string",
            default: "",
            description: "Description of the line item",
          },
          {
            displayName: "Quantity",
            name: "quantity",
            type: "number",
            default: 1,
            description: "Quantity",
          },
          {
            displayName: "Unit Name",
            name: "unitName",
            type: "string",
            default: "Stück",
            description: 'Unit name (e.g., "Stück", "kg", "hours")',
          },
          {
            displayName: "Unit Price",
            name: "unitPrice",
            type: "fixedCollection",
            default: {},
            options: [
              {
                name: "value",
                displayName: "Price",
                values: [
                  {
                    displayName: "Currency",
                    name: "currency",
                    type: "string",
                    default: "EUR",
                    description: "Currency code (e.g., EUR, USD)",
                  },
                  {
                    displayName: "Net Amount",
                    name: "netAmount",
                    type: "number",
                    default: 0,
                    description: "Net amount per unit",
                  },
                  {
                    displayName: "Gross Amount",
                    name: "grossAmount",
                    type: "number",
                    default: 0,
                    description: "Gross amount per unit (optional)",
                  },
                  {
                    displayName: "Tax Rate Percentage",
                    name: "taxRatePercentage",
                    type: "number",
                    default: 19,
                    description: "Tax rate in percentage",
                  },
                ],
              },
            ],
          },
          {
            displayName: "Discount Percentage",
            name: "discountPercentage",
            type: "number",
            default: 0,
            description: "Discount percentage for this line item",
          },
        ],
      },
    ],
  },
  {
    displayName: "Line Items JSON",
    name: "lineItemsJson",
    type: "string",
    default: "[]",
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["createByJson"],
      },
    },
    description:
      "JSON array of line items. Each item should have: type, name, description, quantity, unitName, unitPrice, discountPercentage",
  },
  {
    displayName: "Total Price",
    name: "totalPrice",
    type: "fixedCollection",
    default: {},
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["create", "createByJson"],
      },
    },
    options: [
      {
        name: "value",
        displayName: "Total Price",
        values: [
          {
            displayName: "Currency",
            name: "currency",
            type: "string",
            default: "EUR",
            description: "Currency code",
          },
          {
            displayName: "Total Net Amount",
            name: "totalNetAmount",
            type: "number",
            default: 0,
            description: "Total net amount",
          },
          {
            displayName: "Total Gross Amount",
            name: "totalGrossAmount",
            type: "number",
            default: 0,
            description: "Total gross amount",
          },
          {
            displayName: "Total Tax Amount",
            name: "totalTaxAmount",
            type: "number",
            default: 0,
            description: "Total tax amount",
          },
        ],
      },
    ],
  },
  {
    displayName: "Tax Conditions",
    name: "taxConditions",
    type: "fixedCollection",
    default: {},
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["create", "createByJson"],
      },
    },
    options: [
      {
        name: "value",
        displayName: "Tax Conditions",
        values: [
          {
            displayName: "Tax Type",
            name: "taxType",
            type: "options",
            options: [
              { name: "Net", value: "net" },
              { name: "Gross", value: "gross" },
              { name: "VAT Free", value: "vatfree" },
              { name: "Intra Community Supply", value: "intraCommunitySupply" },
              { name: "Construction Service 13b", value: "constructionService13b" },
              { name: "External Service 13b", value: "externalService13b" },
              {
                name: "Third Party Country Service",
                value: "thirdPartyCountryService",
              },
              {
                name: "Third Party Country Delivery",
                value: "thirdPartyCountryDelivery",
              },
              {
                name: "Photovoltaic Equipment",
                value: "photovoltaicEquipment",
              },
            ],
            default: "net",
            description: "Tax type for the credit note",
          },
          {
            displayName: "Tax Type Note",
            name: "taxTypeNote",
            type: "string",
            default: "",
            description: "Additional note for the tax type",
          },
          {
            displayName: "Tax Sub Type",
            name: "taxSubType",
            type: "options",
            options: [
              { name: "Distance Sales", value: "distanceSales" },
              { name: "Electronic Services", value: "electronicServices" },
              { name: "None", value: "" },
            ],
            default: "",
            description: "Tax sub type for EU distance sales",
          },
        ],
      },
    ],
  },
  {
    displayName: "Shipping Conditions",
    name: "shippingConditions",
    type: "fixedCollection",
    default: {},
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["create", "createByJson"],
      },
    },
    options: [
      {
        name: "value",
        displayName: "Shipping Conditions",
        values: [
          {
            displayName: "Shipping Date",
            name: "shippingDate",
            type: "string",
            default: "",
            description: "Shipping/delivery date",
          },
          {
            displayName: "Shipping Type",
            name: "shippingType",
            type: "options",
            options: [
              { name: "Service", value: "service" },
              { name: "Service Period", value: "servicePeriod" },
              { name: "Delivery", value: "delivery" },
            ],
            default: "delivery",
            description: "Type of shipping",
          },
        ],
      },
    ],
  },
  {
    displayName: "Payment Conditions",
    name: "paymentConditions",
    type: "fixedCollection",
    default: {},
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["create", "createByJson"],
      },
    },
    options: [
      {
        name: "value",
        displayName: "Payment Conditions",
        values: [
          {
            displayName: "Payment Term Label",
            name: "paymentTermLabel",
            type: "string",
            default: "",
            description: "Label for payment terms",
          },
          {
            displayName: "Payment Term Duration",
            name: "paymentTermDuration",
            type: "number",
            default: 14,
            description: "Payment term duration in days",
          },
          {
            displayName: "Payment Discount Conditions",
            name: "paymentDiscountConditions",
            type: "fixedCollection",
            default: {},
            options: [
              {
                name: "value",
                displayName: "Discount",
                values: [
                  {
                    displayName: "Discount Percentage",
                    name: "discountPercentage",
                    type: "number",
                    default: 0,
                    description: "Discount percentage for early payment",
                  },
                  {
                    displayName: "Discount Range",
                    name: "discountRange",
                    type: "number",
                    default: 0,
                    description: "Days within discount is applicable",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  // Get operation fields
  {
    displayName: "Credit Note ID",
    name: "creditNoteId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["get", "pursue", "renderPdf", "downloadFile"],
      },
    },
    description: "ID of the credit note",
  },
  // GetAll operation fields
  {
    displayName: "Page",
    name: "page",
    type: "number",
    default: 0,
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["getAll"],
      },
    },
    description: "Page number for pagination (starts at 0)",
  },
  {
    displayName: "Size",
    name: "size",
    type: "number",
    default: 25,
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["getAll"],
      },
    },
    description: "Number of items per page",
  },
  {
    displayName: "Voucher Status",
    name: "voucherStatus",
    type: "options",
    options: [
      { name: "All", value: "" },
      { name: "Draft", value: "draft" },
      { name: "Open", value: "open" },
      { name: "Paid", value: "paid" },
      { name: "Paidoff", value: "paidoff" },
      { name: "Voided", value: "voided" },
      { name: "Transferred", value: "transferred" },
    ],
    default: "",
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["getAll"],
      },
    },
    description: "Filter by voucher status",
  },
  // Pursue operation fields
  {
    displayName: "Precede Step",
    name: "precedeStep",
    type: "options",
    options: [
      { name: "Invoice", value: "invoice" },
      { name: "Down Payment Invoice", value: "down-payment-invoice" },
    ],
    default: "invoice",
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["pursue"],
      },
    },
    description: "Type of document to pursue from",
  },
  {
    displayName: "Preceding Sales Voucher ID",
    name: "precedingSalesVoucherId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["pursue"],
      },
    },
    description: "ID of the preceding sales voucher (invoice or down payment invoice)",
  },
  // Render PDF fields
  {
    displayName: "Download File ID",
    name: "fileId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["creditNotes"],
        operation: ["downloadFile"],
      },
    },
    description: "ID of the file to download",
  },
];

