import * as dotenv from "dotenv";
import * as Ably from "ably/promises";
import { Context, HttpRequest } from "@azure/functions";

dotenv.config();

export default async function (context: Context, req: HttpRequest): Promise<void> {
    if(!process.env.ABLY_API_KEY) {
        context.res = {
            status: 500,
            body: `Missing ABLY_API_KEY environment variable.
            If you're running locally, please ensure you have a ./api/.env file with a value for ABLY_API_KEY=your-key.
            If you're running in Azure, make sure you've configured the AppSettings ABLY_API_KEY. 
            Please see README.md for more details on configuring your Ably API Key.`
        };
        return;
    }

    const clientId = req.query.clientId || process.env.DEFAULT_CLIENT_ID || "NO_CLIENT_ID";
    const client = new Ably.Rest(process.env.ABLY_API_KEY);
    const tokenRequestData = await client.auth.createTokenRequest({ clientId: clientId});

    context.res = {
      headers: { "content-type": "application/json" },
      body: JSON.stringify(tokenRequestData)
    };
  }