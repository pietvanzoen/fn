import { listenAndServe } from "https://deno.land/std@v0.3.2/http/server.ts";
import { handleRequest } from "./handler.ts";

const { PORT = 4000 } = Deno.env();

listenAndServe(`0.0.0.0:${PORT}`, handleRequest);

console.log("listening on port " + PORT);
