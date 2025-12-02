import { INodeProperties } from "n8n-workflow";

export const postingCategoriesOperations: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["postingCategories"],
    },
  },
  options: [
    {
      name: "Get All",
      value: "getAll",
      description: "Get all posting categories",
      action: "Get all posting categories",
    },
  ],
  default: "getAll",
};

export const postingCategoriesFields: INodeProperties[] = [
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["postingCategories"],
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
        resource: ["postingCategories"],
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

