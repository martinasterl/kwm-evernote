import { List } from "./list";


export class ListFactory {
    static empty() :List{
        return new List(0, '', false, undefined, undefined); 
    }

    static fromObject(rawList: any):List{
        return new List(
            rawList.id, rawList.name, rawList.isPublic, rawList.users, rawList.notes
        );
    }
}
