import { City } from "./city";
import{Photo} from "./photo";
import{User} from "./user";

export class Property {
    id!: number;
    name!: string;
    description!: string;
    status!: string;
    bedrooms!: number;
    bathrooms!: number;
    size!: number;
    price!: number;
    user!: User;
    cityId!: number;
    city!: City;
    photos: Photo[] = [];
  
  
  }
  