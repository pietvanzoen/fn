import "https://deno.land/x/dotenv/load.ts";
import { listenAndServe } from "https://deno.land/std@v0.3.2/http/server.ts";
import { handleRequest } from "./handler.ts";

const { PORT } = Deno.env();

listenAndServe(`0.0.0.0:${PORT}`, handleRequest);

console.log("listening on port " + PORT);
