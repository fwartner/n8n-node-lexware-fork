import { IExecuteFunctions } from "n8n-core";
import {
  INodeExecutionData,
  NodeOperationError,
} from "n8n-workflow";
import { lexwareApiRequest } from "../GenericFunctions";

export async function executePayments(
  this: IExecuteFunctions,
  i: number,
  operation: string
): Promise<INodeExecutionData[]> {
  let responseData: any;

  switch (operation) {
    case "get": {
      const voucherType = this.getNodeParameter("voucherType", i) as string;
      const voucherId = this.getNodeParameter("voucherId", i) as string;
      responseData = await lexwareApiRequest.call(
        this,
        "GET",
        `/v1/payments/${voucherType}/${voucherId}`
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

