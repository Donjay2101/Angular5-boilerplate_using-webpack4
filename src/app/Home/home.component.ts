import { Component } from '@angular/core';


@Component({
    selector:'my-home',
    templateUrl:'./home.component.html'
})

export class HomeComponent{
    constructor(){
        console.log('mode:',process.env.mode);
    }

}