import { INodeProperties } from "n8n-workflow";

export const eventSubscriptionsOperations: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["eventSubscriptions"],
    },
  },
  options: [
    {
      name: "Create",
      value: "create",
      description: "Create a new event subscription",
      action: "Create an event subscription",
    },
    {
      name: "Get",
      value: "get",
      description: "Get an event subscription by ID",
      action: "Get an event subscription",
    },
    {
      name: "Get All",
      value: "getAll",
      description: "Get all event subscriptions",
      action: "Get all event subscriptions",
    },
    {
      name: "Delete",
      value: "delete",
      description: "Delete an event subscription",
      action: "Delete an event subscription",
    },
  ],
  default: "create",
};

export const eventSubscriptionsFields: INodeProperties[] = [
  // Create operation fields
  {
    displayName: "Event Type",
    name: "eventType",
    type: "options",
    options: [
      // Contact events
      { name: "Contact Created", value: "contact.created" },
      { name: "Contact Changed", value: "contact.changed" },
      { name: "Contact Deleted", value: "contact.deleted" },
      // Invoice events
      { name: "Invoice Created", value: "invoice.created" },
      { name: "Invoice Changed", value: "invoice.changed" },
      { name: "Invoice Deleted", value: "invoice.deleted" },
      { name: "Invoice Status Changed", value: "invoice.status.changed" },
      // Credit note events
      { name: "Credit Note Created", value: "credit-note.created" },
      { name: "Credit Note Changed", value: "credit-note.changed" },
      { name: "Credit Note Deleted", value: "credit-note.deleted" },
      { name: "Credit Note Status Changed", value: "credit-note.status.changed" },
      // Quotation events
      { name: "Quotation Created", value: "quotation.created" },
      { name: "Quotation Changed", value: "quotation.changed" },
      { name: "Quotation Deleted", value: "quotation.deleted" },
      // Order confirmation events
      { name: "Order Confirmation Created", value: "order-confirmation.created" },
      { name: "Order Confirmation Changed", value: "order-confirmation.changed" },
      { name: "Order Confirmation Deleted", value: "order-confirmation.deleted" },
      {
        name: "Order Confirmation Status Changed",
        value: "order-confirmation.status.changed",
      },
      // Delivery note events
      { name: "Delivery Note Created", value: "delivery-note.created" },
      { name: "Delivery Note Changed", value: "delivery-note.changed" },
      { name: "Delivery Note Deleted", value: "delivery-note.deleted" },
      {
        name: "Delivery Note Status Changed",
        value: "delivery-note.status.changed",
      },
      // Dunning events
      { name: "Dunning Created", value: "dunning.created" },
      { name: "Dunning Changed", value: "dunning.changed" },
      { name: "Dunning Deleted", value: "dunning.deleted" },
      // Voucher events
      { name: "Voucher Created", value: "voucher.created" },
      { name: "Voucher Changed", value: "voucher.changed" },
      { name: "Voucher Deleted", value: "voucher.deleted" },
      { name: "Voucher Status Changed", value: "voucher.status.changed" },
      // Down payment invoice events
      {
        name: "Down Payment Invoice Created",
        value: "down-payment-invoice.created",
      },
      {
        name: "Down Payment Invoice Changed",
        value: "down-payment-invoice.changed",
      },
      {
        name: "Down Payment Invoice Deleted",
        value: "down-payment-invoice.deleted",
      },
      {
        name: "Down Payment Invoice Status Changed",
        value: "down-payment-invoice.status.changed",
      },
    ],
    default: "invoice.created",
    required: true,
    displayOptions: {
      show: {
        resource: ["eventSubscriptions"],
        operation: ["create"],
      },
    },
    description: "Type of event to subscribe to",
  },
  {
    displayName: "Callback URL",
    name: "callbackUrl",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["eventSubscriptions"],
        operation: ["create"],
      },
    },
    description: "URL that will receive the webhook callbacks",
  },
  // Get and Delete operation fields
  {
    displayName: "Subscription ID",
    name: "subscriptionId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["eventSubscriptions"],
        operation: ["get", "delete"],
      },
    },
    description: "ID of the event subscription",
  },
  // GetAll operation fields
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["eventSubscriptions"],
        operation: ["getAll"],
      },
    },
    description: "Whether to return all results or only up to a given limit",
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    displayOptions: {
      show: {
        resource: ["eventSubscriptions"],
        operation: ["getAll"],
        returnAll: [false],
      },
    },
    typeOptions: {
      minValue: 1,
    },
    description: "Max number of results to return",
  },
];

