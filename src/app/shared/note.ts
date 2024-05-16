import { Todo } from "./todo";
export { Todo } from "./todo";
import { Tag } from "./tag";
export { Tag } from "./tag";

export class Note {
    constructor(
        public id: number, 
        public title: string, 
        public description: string, 
        public list_id: number,
        public tags?: Tag[],
        public image?: string,
        public todos?: Todo[]
    ){}
}
