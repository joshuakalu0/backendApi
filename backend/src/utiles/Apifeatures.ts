interface Record {
  // Define the structure of your data records here
  // (e.g., name: string, age: number)
}

export class ApiFeatures<T extends Record> {
  constructor(private records: T[]) {
    // Removed unused reqQuery parameter
  }

  excludeFields(obj: T[], excludedFields: string[]): T {
    return obj.map((arr) => {
      const newObj = {} as T;
      for (const key in arr) {
        if (!excludedFields.includes(key)) {
          newObj[key] = arr[key];
        }
      }
      return newObj;
    });
  }

  field(fields?: []): this {
    this.records = this.excludeFields(this.records, fields);
    return this;
  }

  filter(): T[] {
    // Implement your filtering logic here using any (replace with specific filtering logic)
    return this.records.filter((record: T) => any); // Placeholder for actual filtering logic
  }
}
