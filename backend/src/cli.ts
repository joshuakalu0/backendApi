import { mkdirSync, writeFileSync } from "fs";

const modelName = process.argv[2];

if (!modelName) {
  console.error("Please provide a model name.");
  process.exit(1);
}
const modelDir = `models/${modelName}`;
try {
  mkdirSync(modelDir);
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
  writeFileSync(`${modelDir}/user.json`, userJson);
  writeFileSync(`${modelDir}/userDb.json`, "[]");

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
  writeFileSync(`${modelDir}/user.ts`, userTs);

  console.log(`Model '${modelName}' created successfully!`);
} catch (error) {
  console.log("check if file already exist");
}
