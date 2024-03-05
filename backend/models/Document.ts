export abstract class Document {
  constructor(public data: any) {}
  get tableName(): string {
    return `tab${this.constructor.name}`;
  }
  validate(): string[] | null {
    //   Validate specfied fields
    const errors: string[] = []; // declare error array
    const Model = require(`./${this.constructor.name.toLowerCase()}/${this.constructor.name.toLowerCase()}.json`); // get schema
    // Check for required fields based on model definition
    console.log(this.data, "data");
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

  validateEmail(email: string): boolean {
    //   Validate email passed in
    const reg =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return !reg.test(email) ? false : true;
  }
}
