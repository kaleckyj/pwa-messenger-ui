import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from '../message/message';
import { Conversation } from '../conversation/conversation';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  newMsg = this.socket.fromEvent<Message>('Message');

  constructor(private socket: Socket) { }


  getMsg() {
    return Observable.create((observer) => {
      this.socket.on('message', (msg) => {
          observer.next(msg);
      });
    });
  }

  sendMsg(msg: Message) {
    this.socket.emit('message', msg);
  }
}
