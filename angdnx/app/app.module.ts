import { NotesListComponent } from './noteslistcomponent';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';


@NgModule({
    imports: [
    BrowserModule,
    FormsModule,
    HttpModule
    ],
    declarations: [NotesListComponent ],
    bootstrap: [ NotesListComponent ]
})
export class AppModule { }