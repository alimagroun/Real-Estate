import { City } from "./city";
import{Photo} from "./photo";

export class Property {
    id!: number;
    name!: string;
    description!: string;
    status!: string;
    bedrooms!: number;
    bathrooms!: number;
    size!: number;
    price!: number;
    cityId!: number;
    city!: City;
    photos: Photo[] = [];
  
  
  }
  