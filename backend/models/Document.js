"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
class Document {
    constructor(data) {
        this.data = data;
    }
    get tableName() {
        return `tab${this.constructor.name}`;
    }
    validate() {
        //   Validate specfied fields
        const errors = []; // declare error array
        const Model = require(`./${this.constructor.name.toLowerCase()}/${this.constructor.name.toLowerCase()}.json`); // get schema
        // Check for required fields based on model definition
        const modelFields = Model.fields.map((obj) => {
            return obj.name;
        });
        this.cleanData(modelFields);
        console.log(this.data, "this");
        for (let field of Model.fields) {
            if (field.required == true && !this.data[field.name]) {
                errors.push(`${field.name} is required`);
            }
            if (field.maxLength && this.data[field.name] > field.maxLength) {
                errors.push(`${field.name} has exceed the maxmium value`);
            }
        }
        if (!this.validateEmail(this.data.email)) {
            errors.push("Please provide a valid Email ");
        }
        if (!(this.data.age > 0)) {
            console.log(this.data.age);
            errors.push("Invalid Age passed in ");
        }
        return errors.length > 0 ? errors : null;
    }
    cleanData(fields) {
        const newObj = {};
        for (const key in this.data) {
            if (fields.includes(key)) {
                newObj[key] = this.data[key];
            }
        }
        this.data = Object.assign({}, newObj);
    }
    validateEmail(email) {
        //   Validate email passed in
        const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return !reg.test(email) ? false : true;
    }
}
exports.Document = Document;
