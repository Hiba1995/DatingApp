import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs';

@Injectable({  // can use dependency injection from angular to be injected in other comp or services..
  //and considered sigleton // it will start when the ang app start
  providedIn: 'root',
})
export class AccountService {

  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);  

  baseUrl= 'https://localhost:5001/api/';

  login(creds: any){
    return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe( // creds is an object in the body of http request
      tap(user => {
        if(user){
         this.setCurrentUser(user)
        }
      })
    )
  }

  logout(creds: any){
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
  register(creds: RegisterCreds){
    return this.http.post<User>(this.baseUrl + 'account/register', creds).pipe( // creds is an object in the body of http request
      tap(user => {
        if(user){
         this.setCurrentUser(user)
        }
      })
    )
  }

  setCurrentUser(user:User){
    localStorage.setItem('user', JSON.stringify(user)) // key: user value: stingify user
           this.currentUser.set(user);
  }
}
