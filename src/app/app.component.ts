import { OnInit, Component } from '@angular/core';
import { MessengerService } from './messenger.service';
import { User } from './user/user';
import { Conversation } from './conversation/conversation';
import { LoginComponent } from './login/login.component';
import { WebsocketService } from './websocket/websocket.service';
import { Message } from './message/message';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessengerService, WebsocketService, LoginService]
})
export class AppComponent implements OnInit {
  currentUser: User;
  currentConv: Conversation;
  allConvs: Conversation[] = [];
  allUsers: User[] = [];

  canRenderUser = false;
  canRenderContacts = false;
  canRenderConversation = false;
  canRenderLogin = true;

  constructor(private messengerService: MessengerService, private socket: WebsocketService, private loginService: LoginService) {}

  ngOnInit(){
    //this.getUser("1");
  }

  getUsers(): void {
    this.allUsers = [];
    this.messengerService.getUsers().subscribe(
      (data) => {
        this.allUsers = data;
        console.log(this.allUsers);
      }
    );
  }

  getUser(id: string): void {
    this.messengerService.getUser(id).subscribe(
      (data) => {
        this.currentUser = data;
        this.canRenderLogin = false;
        this.canRenderUser = true;
        console.log(this.currentUser);
        this.getUsers();
        this.getConvs();
      }
    );
  }

  getConvs(): void {
    this.canRenderContacts = false;
    this.allUsers = [];
    this.messengerService.getConvs(this.currentUser.id).subscribe(
      (data) => {
        this.allConvs = data;
        this.canRenderContacts = true;
      }
    );
  }

  getConv(id: string): void {
    this.messengerService.getConv(this.currentUser.id, id).subscribe(
      (data) => {
        this.currentConv = data;
        this.canRenderConversation = true;
        this.socket.getMsg().subscribe(
          (message: Message) => {
            this.currentConv.messages.push(message);
        });
      }
    );
  }

  openConv(id: string) {
    console.log(id);
    for (let index = 0; index < this.allConvs.length; index++) {
      if (id == this.allConvs[index].id) {
        this.getConv(id);
      }
    }
  }

  createConv(conv: Conversation) {
    this.allConvs.push(conv);
    //this.socket.setupConv(conv);
  }

  sendMsg(msg: Message) {
    this.socket.sendMsg(msg);
  }

  login(usr: User) {
    this.loginService.postLogin(usr).subscribe(
      (user) => {
        if (user.id !== undefined) {
          this.getUser(user.id);
        }
      }
    );
  }

}
