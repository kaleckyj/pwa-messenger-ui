import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ObjectUnsubscribedError, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { User } from './user/user';
import { Conversation } from './conversation/conversation';
import { Message } from './message/message';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usersMockURL = 'https://private-6e909-pwakalecky.apiary-mock.com/login';
  usersLocalURL = 'http://localhost:4000/login';
  usersHerokuURL = 'https://pwa-kalecky-api.herokuapp.com/login';

  constructor(private http: HttpClient) { }

  postLogin(usr: User): Observable<User> {
    console.log(usr);
    return this.http.post<User>(this.usersLocalURL, JSON.stringify(usr), httpOptions);
  }

}
