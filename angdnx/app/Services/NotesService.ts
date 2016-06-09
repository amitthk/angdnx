import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import "rxjs/add/operator/map";
import { Note } from '../Models/Note';

@Injectable()
export class NotesService {

    apiUrl:string;

    constructor(private http:Http) { 
        this.apiUrl='/api/note';
    }
    
     getNotes(){
         return this.http.get(this.apiUrl).map((res: Response) => res);
     }

     updateNote(id:string,note:Note){
        let body = JSON.stringify(note);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
         return this.http.put(this.apiUrl+'/'+id,body, options).map((res:Response)=>res);
     }
     
     addNote(note:Note){
         return this.http.post(this.apiUrl,JSON.stringify(note)).map((res:Response)=>res);
     }

     deleteNote(id:string){
        return this.http.delete(this.apiUrl+'/'+id).map((res:Response)=>res);
     }

}