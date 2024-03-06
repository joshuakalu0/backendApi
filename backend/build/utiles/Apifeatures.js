"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFeatures = void 0;
class ApiFeatures {
    constructor(records) {
        this.records = records;
        // Removed unused reqQuery parameter
    }
    excludeFields(obj, excludedFields) {
        return obj.map((arr) => {
            const newObj = {};
            for (const key in arr) {
                if (!excludedFields.includes(key)) {
                    newObj[key] = arr[key];
                }
            }
            return newObj;
        });
    }
    field(fields) {
        this.records = this.excludeFields(this.records, fields);
        return this;
    }
    filter() {
        // Implement your filtering logic here using any (replace with specific filtering logic)
        return this.records.filter((record) => any); // Placeholder for actual filtering logic
    }
}
exports.ApiFeatures = ApiFeatures;
