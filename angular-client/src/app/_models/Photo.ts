export class Photo {
    id: number;
    filename: string;
    filepath: string;
  
    constructor(id: number, filename: string, filepath: string) {
      this.id = id;
      this.filename = filename;
      this.filepath = filepath;
    }
  }
  