import { Note } from "./note";
export { Note } from "./note";
import { User } from "./user";
export { User } from "./user";

export class List {
    constructor(
        public id: number,
        public name: string,
        public isPublic: boolean,
        public users?: User[],
        public notes?: Note[]
    ){}
}
