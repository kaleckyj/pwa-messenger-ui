import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from './user/user';
import { Conversation } from './conversation/conversation';
import { Message } from './message/message';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  usersMockURL = 'https://private-6e909-pwakalecky.apiary-mock.com/users';
  usersLocalURL = 'http://localhost:4000/users';
  usersHerokuURL = 'https://pwa-kalecky-api.herokuapp.com/users';
  URL = this.usersHerokuURL;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.URL + '/' + id);
  }

  getConv(userId: string, convId): Observable<Conversation> {
    return this.http.get<Conversation>(this.URL + '/' + userId + '/conversations/' + convId);
  }

  getConvs(userId: string): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(this.URL + '/' + userId + '/conversations');
  }

  editConv(userId: string, convId: string, msg: Message): void {
    this.http.post<Object>(this.URL + '/' + userId + '/conversations/' + convId, {id: convId,
       from: msg.from, dateTime: msg.dateTime, message: msg.message}, httpOptions).subscribe();
  }

  createConv(userId: string, convId: string, members: {}): void {
    this.http.post<Object>(this.URL + '/' + userId + '/conversations', {id: convId, members: members}, httpOptions).subscribe();
  }

}
