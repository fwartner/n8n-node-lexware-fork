import {
  IAuthenticateGeneric,
  ICredentialType,
  INodeProperties,
  ICredentialTestRequest,
} from "n8n-workflow";

export class LexwareApi implements ICredentialType {
  name = "lexwareApi";
  displayName = "Lexware API";
  documentationUrl = "https://developers.lexware.io/docs/";
  properties: INodeProperties[] = [
    {
      displayName: "Base URL",
      name: "baseUrl",
      type: "string",
      default: "https://api.lexware.io",
      required: false,
      placeholder: "https://api.lexware.io",
      description: "Base URL of the Lexware API. Defaults to https://api.lexware.io if not specified.",
    },
    {
      displayName: "Access Token",
      name: "accessToken",
      type: "string",
      typeOptions: {
        password: true,
      },
      default: "",
      required: true,
      description: "Personal access token for Lexware API",
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: "generic",
    properties: {
      headers: {
        Authorization: '={{"Bearer " + $credentials.accessToken}}',
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: "={{$credentials.baseUrl}}",
      url: "/v1/profile",
      method: "GET",
    },
  };
}
