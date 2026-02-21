import { Component, inject } from '@angular/core';
import { Nav } from "../layout/nav/nav";

import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {
 
  //inject the http client 
  //implemts onInit toinitialize the component 
  // private http = inject(HttpClient);
  protected router = inject(Router);
  // protected title = 'Dating app';
  // protected members = signal<User[]>([]); // i use signal bexause when i install angular i install  provideZonelessChangeDetection(),
  //help me that any change do will reflect to the html 

  //  async ngOnInit() {
    // return an observable of the response body
   //observable for managing async data streams, we have to subscribe 
   //next give me the error, error: when i have an error, when is completed it return a message 
  //  this.http.get('https://localhost:5001/api/members').subscribe ({
  //   next: response => this.members.set(response),
  //   error: error=> console.log(error),
  //   complete: () => console.log('complete the http request')

  //  })
  // when i use async and return a promise
  
  // }
  // private accountService= inject(AccountService)

//   async ngOnInit(){
//   this.members.set(await this.getMembers())
//  // this.setCurrentUser();
//   }

// this method is used to tell the app that the user is logged in 
  // setCurrentUser(){
  //   const userString = localStorage.getItem('user')
  //   if(!userString) return; // return nothing 
  //   const user = JSON.parse(userString);
  //   this.accountService.currentUser.set(user);
  // }



//  async  getMembers(){
//   //instead of returning an observable it return a promise

//   try{
//      return  lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
//   }
//    catch(error)
//    {
//      console.error(error);
//     throw error
    
//    }
//   }
 
}
