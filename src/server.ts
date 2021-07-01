require("dotenv").config();
import "reflect-metadata";

import express from "express";
import { router } from "./router";
import "./database/connect";

const app = express();

app.use(express.json());

app.get("/", (res, req) => req.send({ ok: true }));

app.use(router);

app.listen(process.env.PORT || 3004, () =>
  console.log(`Server started on http://localhost:${process.env.PORT}`)
);
