import { Tag } from "./tag";

export class TagFactory {
    static empty():Tag{
        return new Tag(
            0, '', undefined, undefined
        );
    }

    static fromObject(rawTag: any):Tag{
        return new Tag(
            rawTag.id, rawTag.name, rawTag.todos, rawTag.notes
        );
    }
}
