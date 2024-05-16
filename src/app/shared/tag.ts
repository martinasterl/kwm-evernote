import { Note } from "./note";
import { Todo } from "./todo";
export { Note } from "./note";
export { Todo } from "./todo";


export class Tag {
    constructor(
        public id: number, 
        public name: string,
        public todos?: Todo[],
        public notes?: Note[]
    ){}
}
