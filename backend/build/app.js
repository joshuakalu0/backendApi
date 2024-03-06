"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const Apifeatures_1 = require("./utiles/Apifeatures");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/api/v1/models/:modelName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // gets all record in the Db
    const modelName = req.params.modelName;
    const fields = req.query.fields || [];
    const filters = JSON.parse(req.query.filters || "{}");
    try {
        const CapitalizeModelName = toCapitalize(modelName);
        const Db = require(`../models/${modelName}/${modelName}Db.json`);
        const record = new Apifeatures_1.ApiFeatures(Db).field(fields); // performance query on the request.query
        // .filter(filters);
        res.status(200).json(record);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve data" });
    }
}));
app.post("/api/v1/models/:modelName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // create new records
    const modelName = req.params.modelName;
    try {
        const CapitalizeModelName = toCapitalize(modelName);
        const Schema = require(`../models/${modelName}/${modelName}.js`)[`${CapitalizeModelName}`];
        if (!Schema) {
            return res.status(404).json({
                error: `Schema '${modelName}' not found, please create schema first`,
            });
        }
        const Db = require(`../models/${modelName}/${modelName}Db.json`);
        const cleanedData = new Schema(req.body);
        const validationErrors = cleanedData.validate();
        console.log(validationErrors, "data", cleanedData.data);
        try {
            if (validationErrors == null) {
                const data = Object.assign(Object.assign({}, req.body), { id: Db.length });
                Db.push(cleanedData.data);
                (0, fs_1.writeFile)(`./models/${modelName}/${modelName}Db.json`, JSON.stringify(Db), () => {
                    res.status(200).json({ status: "success", data: Db });
                });
            }
            else {
                throw validationErrors;
            }
        }
        catch (error) {
            res.status(500).json({
                error: "Failed to create record",
                err: error,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "error occured trying to create data",
        });
    }
}));
app.listen(8080, () => {
    console.log("serve started");
});
const toCapitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
