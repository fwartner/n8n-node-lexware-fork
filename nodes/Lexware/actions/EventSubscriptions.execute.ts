import { IExecuteFunctions } from "n8n-core";
import {
  IDataObject,
  INodeExecutionData,
  NodeOperationError,
} from "n8n-workflow";
import { lexwareApiRequest } from "../GenericFunctions";

export async function executeEventSubscriptions(
  this: IExecuteFunctions,
  i: number,
  operation: string
): Promise<INodeExecutionData[]> {
  let responseData: any;

  switch (operation) {
    case "create": {
      const eventType = this.getNodeParameter("eventType", i) as string;
      const callbackUrl = this.getNodeParameter("callbackUrl", i) as string;

      const body: IDataObject = {
        eventType,
        callbackUrl,
      };

      responseData = await lexwareApiRequest.call(
        this,
        "POST",
        "/v1/event-subscriptions",
        body
      );
      break;
    }

    case "get": {
      const subscriptionId = this.getNodeParameter(
        "subscriptionId",
        i
      ) as string;
      responseData = await lexwareApiRequest.call(
        this,
        "GET",
        `/v1/event-subscriptions/${subscriptionId}`
      );
      break;
    }

    case "getAll": {
      const returnAll = this.getNodeParameter("returnAll", i, false) as boolean;
      responseData = await lexwareApiRequest.call(
        this,
        "GET",
        "/v1/event-subscriptions"
      );

      if (!returnAll) {
        const limit = this.getNodeParameter("limit", i, 50) as number;
        if (Array.isArray(responseData)) {
          responseData = responseData.slice(0, limit);
        }
      }
      break;
    }

    case "delete": {
      const subscriptionId = this.getNodeParameter(
        "subscriptionId",
        i
      ) as string;
      responseData = await lexwareApiRequest.call(
        this,
        "DELETE",
        `/v1/event-subscriptions/${subscriptionId}`
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

