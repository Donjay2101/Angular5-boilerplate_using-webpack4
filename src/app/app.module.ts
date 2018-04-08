import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import {AppComponent} from './app.component';
import { HomeComponent } from './Home/home.component';



@NgModule({
    declarations:[
        AppComponent,
        HomeComponent
    ],
    imports:[
        FormsModule,
        BrowserModule,
    ],
    bootstrap:[AppComponent]
})

export class AppModule{

}
