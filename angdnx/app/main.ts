/// <reference path='../typings/index.d.ts' />

import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { NotesListComponent } from './noteslistcomponent';

// enableProdMode();

bootstrap(NotesListComponent, [HTTP_PROVIDERS])
    .then(success => console.log('Bootstrap success'))
    .catch(error => console.log(error));
