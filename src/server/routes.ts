import express from "express";
import { logRequest } from "../utils/logging";
import axios from "axios";

export function index(req: express.Request, res: express.Response) {
  logRequest(req);
  res.send(`<h1>Sat Viewer API, by GeoGuardians - Luna</h1>
           <p>check more details in: <a href="https://github.com/Gabriel-Grechuk/sat-viewer">https://github.com/Gabriel-Grechuk/sat-viewer</a><\p>`);
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
      res.statusCode = 412;
      res.send(
        `<h1>Argumentos inválidos</h1><p>Args:</p><p>${JSON.stringify(req.query)}</p>`,
      );
      return;
    }

    const queryUrl = `https://maps.googleapis.com/maps/api/elevation/json?locations=${
      lat
    },${long}&key=${process.env.GOOGLE_API_KEY}`;

    const googleRes = await axios.get(queryUrl);

    const response = {
      elevation: googleRes.data.results[0].elevation,
    };

    res.send(response);
  } catch (error) {
    res.statusCode = 412;
    res.send(
      `<h1>Argumentos inválidos</h1><p>Args:</p><p>${JSON.stringify(req.query)}</p>`,
    );
  }
}

export async function slopeInChunk(
  req: express.Request,
  res: express.Response,
) {
  try {
    const distance = 0.01;

    logRequest(req);

    const lat = parseFloat(`${req.query?.lat}`);
    const long = parseFloat(`${req.query?.long}`);

    if (!lat || !long) {
      res.statusCode = 412;
      res.send(
        `<h1>Argumentos inválidos</h1><p>Args:</p><p>${JSON.stringify(req.query)}</p>`,
      );
      return;
    }

    const centerPoint = [lat, long];
    const nPoint = [lat + distance, long];
    const sPoint = [lat - distance, long];
    const ePoint = [lat, long + distance];
    const wPoint = [lat, long - distance];
    const nePoint = [lat + distance, long + distance];
    const nwPoint = [lat + distance, long - distance];
    const swPoint = [lat - distance, long - distance];
    const sePoint = [lat - distance, long + distance];

    const points = [
      centerPoint,
      nPoint,
      sPoint,
      ePoint,
      wPoint,
      nePoint,
      nwPoint,
      swPoint,
      sePoint,
    ];

    const pointsString = points.join("|");

    const queryUrl = `https://maps.googleapis.com/maps/api/elevation/json?locations=${
      pointsString
    }&key=${process.env.GOOGLE_API_KEY}`;

    const googleRes = await axios.get(queryUrl);

    const fetchedElevations = googleRes.data.results.map((elevation) =>
      parseFloat(elevation.elevation),
    );

    // Calculating the mins and maxs in every axis.
    const x = points.map((point) => point[0]);
    const y = points.map((point) => point[1]);
    const z = fetchedElevations;

    const dX = Math.max(...x) - Math.min(...x);
    const dY = Math.max(...y) - Math.min(...y);
    const dZ = Math.max(...z) - Math.min(...z);

    console.log("dX", dX);
    console.log("dY", dY);
    console.log("dZ", dZ);

    const slope = Math.atan(dZ / Math.sqrt(dX * dX + dY * dY));
    const degSlope = (slope * 180) / Math.PI;

    const response = {
      slope: degSlope,
    };

    res.send(response);
  } catch (error) {
    console.log(error);
    res.statusCode = 412;
    res.send(
      `<h1>Argumentos inválidos</h1><p>Args:</p><p>${JSON.stringify(req.query)}</p>`,
    );
  }
}

export async function report(req: express.Request, res: express.Response) {
  try {
    logRequest(req);

    const lat = req.query?.lat;
    const long = req.query?.long;

    if (!lat || !long) {
      res.statusCode = 412;
      res.send(
        `<h1>Argumentos inválidos</h1><p>Args:</p><p>${JSON.stringify(req.query)}</p>`,
      );
      return;
    }

    const queryUrl = "https://wttr.in/Campo_Mourao?format=j1";

    const googleRes = await axios.get(queryUrl);

    const response = {
      current_data: googleRes.data,
    };

    res.send(response);
  } catch (error) {
    res.statusCode = 412;
    res.send(
      `<h1>Argumentos inválidos</h1><p>Args:</p><p>${JSON.stringify(req.query)}</p>`,
    );
  }
}
