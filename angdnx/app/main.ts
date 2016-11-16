/// <reference path='../typings/index.d.ts' />
///<reference path='../typings/globals/core-js/index.d.ts'/>
///<reference path='../typings/globals/jasmine/index.d.ts'/>
///<reference path='../typings/globals/node/index.d.ts'/>

//import { enableProdMode } from '@angular/core';
//import { NgModule }      from '@angular/core';
import { platformBrowserDynamic  } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';


// enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule)
    .then(success => console.log('Bootstrap success'))
    .catch(error => console.log(error));
