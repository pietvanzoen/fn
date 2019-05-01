import { serverLog } from "./logger.ts";
import { Response, ServerRequest } from "https://deno.land/std/http/server.ts";

import * as funcs from "./funcs/main.ts";

type FuncService = (req: ServerRequest) => [number, object];

export async function handleRequest(req) {
  let response: Response;

  try {
    const func: FuncService = funcs[req.url.replace(/\//g, "")] || notFound;
    const [status, body] = await func(req);
    response = createResponse(status, body);
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

function notFound() {
  return [404, { message: "not found" }];
}
