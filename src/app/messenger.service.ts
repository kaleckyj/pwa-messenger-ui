import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ObjectUnsubscribedError, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { User } from './user/user';
import { Conversation } from './conversation/conversation';
import { Message } from './message/message';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  usersMockURL = 'https://private-6e909-pwakalecky.apiary-mock.com/users';
  usersLocalURL = 'http://localhost:4000/users';
  usersHerokuURL = 'https://pwa-kalecky-api.herokuapp.com/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersLocalURL);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.usersLocalURL + '/' + id);
  }

  getConv(userId: string, convId): Observable<Conversation> {
    return this.http.get<Conversation>(this.usersLocalURL + '/' + userId + '/conversations/' + convId);
  }

  getConvs(userId: string): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(this.usersLocalURL + '/' + userId + '/conversations');
  }

}
