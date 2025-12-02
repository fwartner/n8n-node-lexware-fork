import { INodeProperties } from "n8n-workflow";

export const profileOperations: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["profile"],
    },
  },
  options: [
    {
      name: "Get",
      value: "get",
      description: "Get profile information",
      action: "Get profile information",
    },
  ],
  default: "get",
};

export const profileFields: INodeProperties[] = [];

