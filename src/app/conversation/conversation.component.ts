import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Conversation } from './conversation';
import { Message } from '../message/message';
import { User } from '../user/user';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  lastMsg: Message;
  textValue: String;

  @Input() user: User;
  @Input() currentConv: Conversation;

  @Output() emitMessage = new EventEmitter<Message>();

  constructor() {}

  ngOnInit(): void {

  }

  sendMessage(msg: string): void {
    if (msg.replace(" ", "").length >= 1) {
      this.lastMsg = new Message;
      this.lastMsg.from = this.user.name;
      this.lastMsg.dateTime = (new Date).toLocaleString();
      this.lastMsg.message = msg;
      if (this.currentConv.messages === undefined) {this.currentConv.messages = [];}
      this.currentConv.messages.push(this.lastMsg);

      this.emitMessage.emit(this.lastMsg);
      this.textValue = "";

    }
  }
}
