import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AppComponent} from './app.component';




@NgModule({
    declarations:[
        AppComponent
    ],
    imports:[
        FormsModule
    ],
    bootstrap:[AppComponent]
})

export class AppModule{

}
