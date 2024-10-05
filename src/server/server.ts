import express from "express";

import * as routes from "./routes";

const app = express();

app.get("/", routes.index);
app.get("/elevation", routes.elevationByCoord);
app.get("/slope", routes.slopeInChunk);

export default {
  app,
};

const res = {
  elevation: [
    {
      elevation: 333.977783203125,
      location: {
        lat: -24,
        lng: -52,
      },
      resolution: 152.7032318115234,
    },
    {
      elevation: 334.26904296875,
      location: {
        lat: -23.9998,
        lng: -52,
      },
      resolution: 152.7032318115234,
    },
    {
      elevation: 333.6864929199219,
      location: {
        lat: -24.0002,
        lng: -52,
      },
      resolution: 152.7032318115234,
    },
    {
      elevation: 334.26904296875,
      location: {
        lat: -24,
        lng: -51.9998,
      },
      resolution: 152.7032318115234,
    },
    {
      elevation: 333.6864929199219,
      location: {
        lat: -24,
        lng: -52.0002,
      },
      resolution: 152.7032318115234,
    },
    {
      elevation: 334.5603332519531,
      location: {
        lat: -23.9998,
        lng: -51.9998,
      },
      resolution: 152.7032318115234,
    },
    {
      elevation: 333.977783203125,
      location: {
        lat: -23.9998,
        lng: -52.0002,
      },
      resolution: 152.7032318115234,
    },
    {
      elevation: 333.3952331542969,
      location: {
        lat: -24.0002,
        lng: -52.0002,
      },
      resolution: 152.7032318115234,
    },
    {
      elevation: 333.977783203125,
      location: {
        lat: -24.0002,
        lng: -51.9998,
      },
      resolution: 152.7032318115234,
    },
  ],
};
