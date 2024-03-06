"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const modelName = process.argv[2];
if (!modelName) {
    console.error("Please provide a model name.");
    process.exit(1);
}
const modelDir = `models/${modelName}`;
try {
    (0, fs_1.mkdirSync)(modelDir);
    const userJson = JSON.stringify({
        fields: [
            { name: "id", type: "number", primaryKey: true },
            { name: "username", type: "string", required: true, maxLength: 100 },
            { name: "firstname", type: "string", required: false, maxLength: 100 },
            { name: "lastname", type: "string", required: false, maxLength: 100 },
            { name: "email", type: "string", required: true, maxLength: 225 },
            { name: "tel", type: "number", required: false },
            { name: "age", type: "number", required: false },
            { name: "bio", type: "string", required: false, maxLength: 500 },
        ],
    });
    (0, fs_1.writeFileSync)(`${modelDir}/user.json`, userJson);
    (0, fs_1.writeFileSync)(`${modelDir}/userDb.json`, "[]");
    const userTs = `
import { Document } from "../Document";

export class User extends Document {
  constructor(data: any) {
    super(data);
  }

  getFullName(): string {
    const firstName = this.data.Firstname;
    const lastName = this.data.Lastname;
    const fullName = firstName + ' '+ lastName
    return fullName;
  }
}
`;
    (0, fs_1.writeFileSync)(`${modelDir}/user.ts`, userTs);
    console.log(`Model '${modelName}' created successfully!`);
}
catch (error) {
    console.log("check if file already exist");
}
