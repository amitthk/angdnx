import { Component, OnInit } from '@angular/core';
import { NotesService } from './Services/NotesService';
import { NgModule }      from '@angular/core';
import { FormsModule, FormGroup, FormControl }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Note } from './Models/Note';

@Component({
    moduleId: module.id,
    selector: 'notes-list',
    templateUrl: '/app/Views/noteslistcomponent.html',
    providers:[NotesService]
})
export class NotesListComponent implements OnInit {
            allnotes:Note[];
        selectedNote:Note;
        newNote:Note;
        isUpdated:boolean;
    constructor(private notesService:NotesService) { }
    ngOnInit() {
        this.notesService.getNotes().subscribe(lst=>this.allnotes=lst.json());
        this.selectedNote = new Note('','','');;
        this.newNote = new Note('','','');;
     }
    onSelect(note){
         this.selectedNote=note;
     }

    onAdd(note){
        if(note.Text.trim()==''){
            return;
        }
        this.notesService.addNote(note).subscribe(rsp=>{
            note.Id=this.trim(rsp.text(),'"');
            this.allnotes.push(note);
            let fresh=new Note('','','');
            this.newNote = fresh;
        });
    }
    onUpdate(note){
            if(note.Id.trim()==''){
                return;
            }
        this.notesService.updateNote(note.Id,note).subscribe(rsp=>{
           //var idx= this.allnotes.indexOf(note);
           //this.allnotes[idx].Id=rsp.text();
            console.log(rsp.text());
            if (rsp.text()=='true') 
            {
                let fresh=new Note('','','');
                this.selectedNote = fresh;
            }
        });
    }
    onDelete(note){
        if(note.Id.trim()==''){
            return;
        }
        this.notesService.deleteNote(note.Id).subscribe(rsp=>{
            console.log(rsp.text());
            if (rsp.text()=='true') {
                this.deleteItem(this.allnotes,note);
                let fresh=new Note('','','');
                this.selectedNote = fresh;
            }
        });
    }

    trim(str, chr) {
    var rgxtrim = (!chr) ? new RegExp('^\\s+|\\s+$', 'g') : new RegExp('^'+chr+'+|'+chr+'+$', 'g');
    return str.replace(rgxtrim, '');
    }

    deleteItem(arr:Note[],itm:Note){
        for (var idx = 0; idx < arr.length; idx++) {
            var elm = arr[idx];
            if (elm.Id==itm.Id) {
                arr.splice(idx,1);
            }
        }
    }

    isEquivalent(a, b) {
        var bVal=JSON.stringify(a) === JSON.stringify(b);
        return (bVal);
    }
}