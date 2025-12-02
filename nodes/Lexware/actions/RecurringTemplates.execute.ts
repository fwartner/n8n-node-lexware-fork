import { IExecuteFunctions } from "n8n-core";
import {
  IDataObject,
  INodeExecutionData,
  NodeOperationError,
} from "n8n-workflow";
import { lexwareApiRequest } from "../GenericFunctions";

export async function executeRecurringTemplates(
  this: IExecuteFunctions,
  i: number,
  operation: string
): Promise<INodeExecutionData[]> {
  let responseData: any;

  switch (operation) {
    case "get": {
      const templateId = this.getNodeParameter("templateId", i) as string;
      responseData = await lexwareApiRequest.call(
        this,
        "GET",
        `/v1/recurring-templates/${templateId}`
      );
      break;
    }

    case "getAll": {
      const page = this.getNodeParameter("page", i, 0) as number;
      const size = this.getNodeParameter("size", i, 25) as number;
      const qs: IDataObject = { page, size };
      responseData = await lexwareApiRequest.call(
        this,
        "GET",
        "/v1/recurring-templates",
        {},
        qs
      );
      break;
    }

    default:
      throw new NodeOperationError(
        this.getNode(),
        `Unsupported operation: ${operation}`
      );
  }

  const items = Array.isArray(responseData) ? responseData : [responseData];
  return items.map((data) => ({ json: data }));
}

