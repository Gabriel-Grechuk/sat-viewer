import express from "express";
import { logRequest } from "../utils/logging";
import axios from "axios";

export function index(req: express.Request, res: express.Response) {
  logRequest(req);
  res.send("<h1>Opa, bão</h1>");
}

export async function elevationByCoord(
  req: express.Request,
  res: express.Response,
) {
  try {
    logRequest(req);

    const lat = req.query?.lat;
    const long = req.query?.long;

    if (!lat || !long) {
      res.send(
        `<h1>Deu errado pai, argumentos inválidos</h1><p>Args:</p><p>${JSON.stringify(req.query)}</p>`,
      );
      return;
    }

    const queryUrl = `https://maps.googleapis.com/maps/api/elevation/json?locations=${
      lat
    }%2C${long}&key=${process.env.GOOGLE_API_KEY}`;

    const googleRes = await axios.get(queryUrl);

    const response = {
      elevation: googleRes.data.results[0].elevation,
    };

    res.send(response);
  } catch (error) {
    res.send(
      `<h1>Deu errado pai, argumentos inválidos</h1><p>Args:</p><p>${JSON.stringify(req.query)}</p>`,
    );
  }
}
