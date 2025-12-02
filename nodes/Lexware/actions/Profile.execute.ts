import { IExecuteFunctions } from "n8n-core";
import {
  INodeExecutionData,
  NodeOperationError,
} from "n8n-workflow";
import { lexwareApiRequest } from "../GenericFunctions";

export async function executeProfile(
  this: IExecuteFunctions,
  i: number,
  operation: string
): Promise<INodeExecutionData[]> {
  let responseData: any;

  switch (operation) {
    case "get": {
      responseData = await lexwareApiRequest.call(
        this,
        "GET",
        "/v1/profile"
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

