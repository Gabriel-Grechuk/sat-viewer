import express from "express";

import * as routes from "./routes";

const app = express();

app.get("/", routes.index);
app.get("/elevation", routes.elevationByCoord);

export default {
  app,
};
