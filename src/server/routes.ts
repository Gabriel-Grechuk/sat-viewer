import express from "express";

export function index(req: express.Request, res: express.Response) {
  console.log("Request to", req.originalUrl);
  console.log(req.ip);
  console.log();
  res.send("<h1>Opa, bão</h1>");
}
