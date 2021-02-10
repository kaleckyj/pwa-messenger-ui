import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from './user/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usersMockURL = 'https://private-6e909-pwakalecky.apiary-mock.com/login';
  usersLocalURL = 'http://localhost:4000/login';
  usersHerokuURL = 'https://pwa-kalecky-api.herokuapp.com/login';
  URL = this.usersLocalURL;

  constructor(private http: HttpClient) { }

  postLogin(usr: User): Observable<User> {
    //console.log("sending: ");
    //console.log(usr);
    return this.http.post<User>(this.URL, JSON.stringify(usr), httpOptions);
  }

}
