import { INodeProperties } from "n8n-workflow";

export const paymentConditionsOperations: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["paymentConditions"],
    },
  },
  options: [
    {
      name: "Get All",
      value: "getAll",
      description: "Get all payment conditions",
      action: "Get all payment conditions",
    },
  ],
  default: "getAll",
};

export const paymentConditionsFields: INodeProperties[] = [
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["paymentConditions"],
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
        resource: ["paymentConditions"],
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

