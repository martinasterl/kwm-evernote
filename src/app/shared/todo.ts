import { Tag } from "./tag";
export { Tag } from "./tag";

export class Todo {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public dueDate: Date,
        public isPublic: boolean,
        public tags?: Tag[],
        public image?: string,
        public note_id?: number,
        public user_id?: number
    ){}
}
