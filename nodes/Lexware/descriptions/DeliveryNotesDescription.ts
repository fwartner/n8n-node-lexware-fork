import { INodeProperties } from "n8n-workflow";

export const deliveryNotesOperations: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["deliveryNotes"],
    },
  },
  options: [
    {
      name: "Create",
      value: "create",
      description: "Create a new delivery note",
      action: "Create a delivery note",
    },
    {
      name: "Create by JSON",
      value: "createByJson",
      description: "Create a delivery note using JSON line items",
      action: "Create a delivery note by JSON",
    },
    {
      name: "Get",
      value: "get",
      description: "Get a delivery note by ID",
      action: "Get a delivery note",
    },
    {
      name: "Get All",
      value: "getAll",
      description: "Get all delivery notes",
      action: "Get all delivery notes",
    },
    {
      name: "Pursue",
      value: "pursue",
      description: "Pursue a delivery note to create a follow-up document",
      action: "Pursue a delivery note",
    },
    {
      name: "Render PDF",
      value: "renderPdf",
      description: "Render a delivery note as PDF",
      action: "Render delivery note PDF",
    },
    {
      name: "Download File",
      value: "downloadFile",
      description: "Download a delivery note file",
      action: "Download delivery note file",
    },
  ],
  default: "create",
};

export const deliveryNotesFields: INodeProperties[] = [
  // Create operation fields
  {
    displayName: "Title",
    name: "title",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["deliveryNotes"],
        operation: ["create", "createByJson"],
      },
    },
    description: "Title of the delivery note",
  },
  {
    displayName: "Introduction",
    name: "introduction",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["deliveryNotes"],
        operation: ["create", "createByJson"],
      },
    },
    description: "Introduction text for the delivery note",
  },
  {
    displayName: "Remark",
    name: "remark",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["deliveryNotes"],
        operation: ["create", "createByJson"],
      },
    },
    description: "Closing remark for the delivery note",
  },
  {
    displayName: "Voucher Date",
    name: "voucherDate",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["deliveryNotes"],
        operation: ["create", "createByJson"],
      },
    },
    description: 'Date of the delivery note in ISO 8601 format (e.g., "2024-01-15")',
  },
  {
    displayName: "Contact ID",
    name: "contactId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["deliveryNotes"],
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
        resource: ["deliveryNotes"],
        operation: ["create", "createByJson"],
      },
    },
    description: "Language of the delivery note",
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
        resource: ["deliveryNotes"],
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
        resource: ["deliveryNotes"],
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
        resource: ["deliveryNotes"],
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
        resource: ["deliveryNotes"],
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
            ],
            default: "net",
            description: "Tax type for the delivery note",
          },
          {
            displayName: "Tax Type Note",
            name: "taxTypeNote",
            type: "string",
            default: "",
            description: "Additional note for the tax type",
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
        resource: ["deliveryNotes"],
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
  // Get operation fields
  {
    displayName: "Delivery Note ID",
    name: "deliveryNoteId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["deliveryNotes"],
        operation: ["get", "pursue", "renderPdf", "downloadFile"],
      },
    },
    description: "ID of the delivery note",
  },
  // GetAll operation fields
  {
    displayName: "Page",
    name: "page",
    type: "number",
    default: 0,
    displayOptions: {
      show: {
        resource: ["deliveryNotes"],
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
        resource: ["deliveryNotes"],
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
    ],
    default: "",
    displayOptions: {
      show: {
        resource: ["deliveryNotes"],
        operation: ["getAll"],
      },
    },
    description: "Filter by voucher status",
  },
  // Pursue operation fields
  {
    displayName: "Preceding Sales Voucher ID",
    name: "precedingSalesVoucherId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["deliveryNotes"],
        operation: ["pursue"],
      },
    },
    description:
      "ID of the preceding sales voucher (quotation or order confirmation)",
  },
  // Download file fields
  {
    displayName: "File ID",
    name: "fileId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["deliveryNotes"],
        operation: ["downloadFile"],
      },
    },
    description: "ID of the file to download",
  },
];

