/**
 * Note
 */
export class Note {
    Id:string;
    Title:string;
    Text:string;
    constructor(id:string,title:string,text:string) {
        this.Id=id;
        this.Title=title;
        this.Text=text;
    }
}