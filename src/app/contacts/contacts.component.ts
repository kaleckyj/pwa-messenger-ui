import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Conversation } from '../conversation/conversation';
import { User } from '../user/user';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  isHidden = true;
  selectedUsers: User[];
  newConv: Conversation;

  @Input() user: User;
  @Input() users: User[];
  @Input() convs: Conversation[];

  @Output() convOpened = new EventEmitter<number>();
  @Output() convCreated = new EventEmitter<Conversation>();

  constructor() { }

  ngOnInit(): void {

  }

  openConv(i: number) {
    this.convOpened.emit(i);
  }

  convSelector() {
    this.isHidden = !this.isHidden;
  }

  createConv(users: User[]) {
    this.convSelector();
    this.selectedUsers = users;
    this.saveConv();
  }

  saveConv() {
    this.newConv = new Conversation;
    this.newConv.id = "";
    this.newConv.members = [this.user.id];
    this.selectedUsers.forEach(user => {
      this.newConv.members.push(user.id);
    });
    this.newConv.messages = [];
    //console.log("saving conv " + this.newConv);
    this.convCreated.emit(this.newConv);
  }

}
