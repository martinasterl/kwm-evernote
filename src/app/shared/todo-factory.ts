import { Todo } from "./todo";

export class TodoFactory {
    static empty():Todo{
        return new Todo(
            0, '', '', new Date(), false, undefined, undefined, undefined, undefined
        );
    }

    static fromObject(rawTodo: any):Todo{
        return new Todo(
            rawTodo.id, rawTodo.title, rawTodo.description, rawTodo.dueDate, rawTodo.isPublic, rawTodo.tags, rawTodo.image, rawTodo.note_id, rawTodo.user_id
        );
    }
}
