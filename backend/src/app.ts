import express from "express";
import { writeFile } from "fs";
import { ApiFeatures } from "./utiles/Apifeatures";

const app = express();
app.use(express.json());

app.get("/api/v1/models/:modelName", async (req, res) => {
  // gets all record in the Db
  const modelName = req.params.modelName;
  const fields = (req.query.fields as string[]) || [];
  const filters = JSON.parse(req.query.filters || "{}");
  try {
    const CapitalizeModelName = toCapitalize(modelName);
    const Db = require(`../models/${modelName}/${modelName}Db.json`);
    const record = new ApiFeatures(Db).field(fields); // performance query on the request.query
    // .filter(filters);
    res.status(200).json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
});
app.post("/api/v1/models/:modelName", async (req, res) => {
  // create new records
  const modelName = req.params.modelName;
  try {
    const CapitalizeModelName = toCapitalize(modelName);
    const Schema = require(`../models/${modelName}/${modelName}.js`)[
      `${CapitalizeModelName}`
    ];
    if (!Schema) {
      return res.status(404).json({
        error: `Schema '${modelName}' not found, please create schema first`,
      });
    }
    const Db = require(`../models/${modelName}/${modelName}Db.json`);
    const cleanedData = new Schema(req.body);
    const validationErrors = cleanedData.validate();
    console.log(validationErrors, "data");

    try {
      if (validationErrors == null) {
        const data = { ...req.body, id: Db.length };
        Db.push(data);
        writeFile(
          `./models/${modelName}/${modelName}Db.json`,
          JSON.stringify(Db),
          () => {
            res.status(200).json({ status: "success", data: Db });
          }
        );
      } else {
        throw validationErrors;
      }
    } catch (error) {
      res.status(500).json({
        error: "Failed to create record",
        err: error,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error,
    });
  }
});

app.listen(8080, () => {
  console.log("serve started");
});

const toCapitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
