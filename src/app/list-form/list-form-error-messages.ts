export class ErrorMessage{
    constructor(
        public forControl: string,
        public forValidator: string,
        public text: string
    ){}
}

export const ListFormErrorMessages : ErrorMessage[] = [
    new ErrorMessage('name', 'required', 'Ein Name für die Liste muss angegeben werden'),
    new ErrorMessage('description', 'required', 'Es muss eine Beschreibung angegeben werden')
]