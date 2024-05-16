import { List } from "./list";
import { Todo } from "./todo";
export { List } from "./list";
export { Todo } from "./todo";

export class User {
    constructor(
        public id: number,
        public username: string,
        public firstName: string,
        public lastName: string,
        public password: string,
        public lists?: List[],
        public todos?: Todo[],
        public image?: string
    ){}
}
