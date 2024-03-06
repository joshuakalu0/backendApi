"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Document_1 = require("../Document");
class User extends Document_1.Document {
    constructor(data) {
        super(data);
    }
    getFullName() {
        const firstName = this.data.Firstname;
        const lastName = this.data.Lastname;
        const fullName = firstName + ' ' + lastName;
        return fullName;
    }
}
exports.User = User;
