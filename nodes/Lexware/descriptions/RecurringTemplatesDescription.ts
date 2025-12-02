import { INodeProperties } from "n8n-workflow";

export const recurringTemplatesOperations: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["recurringTemplates"],
    },
  },
  options: [
    {
      name: "Get",
      value: "get",
      description: "Get a recurring template by ID",
      action: "Get a recurring template",
    },
    {
      name: "Get All",
      value: "getAll",
      description: "Get all recurring templates",
      action: "Get all recurring templates",
    },
  ],
  default: "get",
};

export const recurringTemplatesFields: INodeProperties[] = [
  {
    displayName: "Template ID",
    name: "templateId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["recurringTemplates"],
        operation: ["get"],
      },
    },
    description: "ID of the recurring template",
  },
  {
    displayName: "Page",
    name: "page",
    type: "number",
    default: 0,
    displayOptions: {
      show: {
        resource: ["recurringTemplates"],
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
        resource: ["recurringTemplates"],
        operation: ["getAll"],
      },
    },
    description: "Number of items per page",
  },
];

