import { Injectable } from '@angular/core';
import { Message } from '../message/message';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client/dist/socket.io';
import { Conversation } from '../conversation/conversation';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: any;

  localURI: string = 'http://localhost:4000';
  herokuURI: string = 'https://pwa-kalecky-api.herokuapp.com';
  URI: string = this.herokuURI;

  constructor() {
    this.socket = io(this.URI, {transports: ['websocket', 'polling', 'flashsocket']});
  }

  getId() {
    return new Observable((observer) => {
      this.socket.on('socketid', (data) => {
        observer.next(data);
      });
    });
  }

  getMsg() {
    return new Observable((observer) => {
      this.socket.on('message', (data) => {
        //console.log("listened to message: ")
        //console.log(data);
        observer.next(data);
      });
    });
  }

  sendMsg(data: Message) {
    //console.log("emitting message: ")
    //console.log(data);
    this.socket.emit('message', data);
  }

  getConv() {
    return new Observable((observer) => {
      this.socket.on('conversation', (data) => {
        //console.log("listened to conv: ")
        //console.log(data);
        observer.next(data);
      });
    });
  }

  createConv(data: Conversation) {
    //console.log("emitting conv: ")
    //console.log(data);
    this.socket.emit('conversation', data);
  }
}
