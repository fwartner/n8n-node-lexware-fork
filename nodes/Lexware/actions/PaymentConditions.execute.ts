import { IExecuteFunctions } from "n8n-core";
import {
  INodeExecutionData,
  NodeOperationError,
} from "n8n-workflow";
import { lexwareApiRequest } from "../GenericFunctions";

export async function executePaymentConditions(
  this: IExecuteFunctions,
  i: number,
  operation: string
): Promise<INodeExecutionData[]> {
  let responseData: any;

  switch (operation) {
    case "getAll": {
      const returnAll = this.getNodeParameter("returnAll", i, false) as boolean;
      responseData = await lexwareApiRequest.call(
        this,
        "GET",
        "/v1/payment-conditions"
      );

      if (!returnAll) {
        const limit = this.getNodeParameter("limit", i, 50) as number;
        if (Array.isArray(responseData)) {
          responseData = responseData.slice(0, limit);
        }
      }
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

