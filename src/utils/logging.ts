import express from "express";

export function logRequest(req: express.Request) {
  console.log("Request to", req.originalUrl);
  console.log("IP:", req.ip);
  console.log("Params:", req.params);
  console.log("Query:", req.query);
  console.log();
}
