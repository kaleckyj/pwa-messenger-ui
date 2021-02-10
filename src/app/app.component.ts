import { OnInit, Component } from '@angular/core';
import { User } from './user/user';
import { Conversation } from './conversation/conversation';
import { Message } from './message/message';
import { WebsocketService } from './websocket/websocket.service';
import { LoginService } from './login.service';
import { MessengerService } from './messenger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebsocketService, MessengerService, LoginService]
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

  constructor(private socketService: WebsocketService, private messengerService: MessengerService,  private loginService: LoginService) {}

  ngOnInit(){
    this.socketService.getMsg().subscribe((data) => {
      //console.log(data);
      this.currentConv.messages.push(data as Message);
    });
  }

  getUsers(): void {
    this.allUsers = [];
    this.messengerService.getUsers().subscribe(
      (data) => {
        this.allUsers = data;
        //console.log("all users:");
        //console.log(this.allUsers);
      }
    );
  }

  getUser(id: string): void {
    this.messengerService.getUser(id).subscribe(
      (data) => {
        this.currentUser = data;
        this.canRenderLogin = false;
        this.canRenderUser = true;
        //console.log("current user:");
        //console.log(this.currentUser);
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
        this.replaceMemberNames();
        //console.log("konverzace: ");
        //console.log(this.allConvs);
        this.canRenderContacts = true;
      }
    );
  }

  replaceMemberNames(): void {
    this.allConvs.forEach(conv => {
      for (let i = 0; i < conv.members.length; i++) {
        this.allUsers.forEach(user => {
          if (user.id.match(conv.members[i])) {
            conv.members[i] = user.name;
          }
        });
      }
    });
  }

  getConv(id: string): void {
    this.messengerService.getConv(this.currentUser.id, id).subscribe(
      (data) => {
        this.currentConv = data;
        this.canRenderConversation = true;
      }
    );
  }

  openConv(id: string) {
    //console.log("user id:");
    //console.log(id);
    for (let index = 0; index < this.allConvs.length; index++) {
      if (id == this.allConvs[index].id) {
        this.getConv(id);
      }
    }
  }

  createConv(conv: Conversation) {
    this.allConvs.push(conv);
    this.currentConv = conv;
    this.messengerService.createConv(this.currentUser.id, this.currentConv.id, conv.members);
    //this.socketService.createConv();
    this.replaceMemberNames();
  }

  sendMsg(msg: Message) {
    //console.log("sending msg:")
    //console.log(msg);
    this.messengerService.editConv(this.currentUser.id, this.currentConv.id, msg);
    this.socketService.sendMsg(msg);
  }

  login(usr: User) {
    this.loginService.postLogin(usr).subscribe(
      (user) => {
        //console.log("logged user:");
        //console.log(user);
        if (user.id !== undefined || user.id.match("-1")) {
          this.getUser(user.id);
        }
      }
    );
  }

}
