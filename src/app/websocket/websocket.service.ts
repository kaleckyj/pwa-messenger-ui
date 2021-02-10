import { Injectable } from '@angular/core';
import { Message } from '../message/message';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client/dist/socket.io';

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
}
