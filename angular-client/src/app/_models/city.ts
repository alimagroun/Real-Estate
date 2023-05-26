import { State } from "./state";
export class City {
    id?: number;
    name?: string;
    stateId?: number;
    state! : State;
}