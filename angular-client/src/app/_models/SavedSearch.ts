import { City } from "./city";
import { State } from "./state";

export interface SavedSearch {
    id: number;
    userId: number;
    status: string;
    state: State;
    city: City;
    minPrice: number;
    maxPrice: number;
    bedrooms: number;
    bathrooms: number;
  }