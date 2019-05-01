import { serverLog } from "./logger.ts";
import { Response } from "https://deno.land/std/http/server.ts";

export async function handleRequest(req) {
  let response: Response;

  try {
    response = createResponse(200, { message: "hello world" });
  } catch (e) {
    response = createResponse(500, { message: `Error: ${e.message}` });
  }

  serverLog(req, response);
  req.respond(response);
}

function createResponse(status: number, body: object): Response {
  const json = JSON.stringify(body);
  const headers = new Headers();
  headers.set("content-length", json.length.toString());
  headers.set("content-type", "application/json");

  return {
    status,
    headers,
    body: new TextEncoder().encode(json)
  };
}
