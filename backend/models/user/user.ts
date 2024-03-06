
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
