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
  otherUsers: User[] = [];
  socketId: string;

  canRenderUser = false;
  canRenderContacts = false;
  canRenderConversation = false;
  canRenderLogin = true;

  subMsg;

  constructor(private socketService: WebsocketService, private messengerService: MessengerService,  private loginService: LoginService) {}

  ngOnInit(){

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

  getUser(id: string): void {
    this.messengerService.getUser(id).subscribe(
      (data) => {
        this.currentUser = data;

        this.socketService.getId().subscribe((data) => {
          this.socketId = data as string;
          console.log("my socket id is: " + this.socketId);
        });

        this.canRenderLogin = false;
        this.canRenderUser = true;
        //console.log("current user:");
        //console.log(this.currentUser);
        this.getUsers();
      }
    );
  }

  getUsers(): void {
    this.allUsers = [];
    this.messengerService.getUsers().subscribe(
      (data) => {
        this.allUsers = data;
        for (let i = 0; i < this.allUsers.length; i++) {
          if (this.allUsers[i].id != this.currentUser.id) {
            this.otherUsers.push(this.allUsers[i]);
          }
        }
        //console.log("all users:");
        //console.log(this.allUsers);
        this.getConvs();
      }
    );
  }

  getConvs(): void {
    this.canRenderContacts = false;

    this.messengerService.getConvs(this.currentUser.id).subscribe(
      (data) => {
        this.allConvs = data;
        this.replaceMemberNames();
        //console.log("konverzace: ");
        //console.log(this.allConvs);
        this.canRenderContacts = true;

        this.socketService.getConv().subscribe((data) => {
          //console.log(data);
          this.allConvs.push(data as Conversation);

          this.replaceMemberNames();
        });
      }
    );
  }

  replaceMemberNames(): void {
    for (let i = 0; i < this.allConvs.length; i++) {
      const index = this.allConvs[i].members.indexOf(this.currentUser.id);
      if (index > -1) {
        this.allConvs[i].members.splice(index, 1);
      }
    }

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
    if (this.subMsg !== undefined) { this.subMsg.unsubscribe(); }

    this.canRenderConversation = false;
    this.messengerService.getConv(this.currentUser.id, id).subscribe(
      (data) => {
        this.currentConv = data;
        for (let i = 0; i < this.currentConv.members.length; i++) {
          this.allUsers.forEach(user => {
            if (user.id.match(this.currentConv.members[i])) {
              this.currentConv.members[i] = user.name;
            }
          });
        }

        this.canRenderConversation = true;

        this.subMsg = this.socketService.getMsg().subscribe((data) => {
          var msg = data as Message;
          console.log(msg);
          if (this.currentConv.members.includes(msg.from)) {
            this.currentConv.messages.push(data as Message);
          }
        });
      }
    );
  }

  createConv(conv: Conversation) {
    //this.allConvs.push(conv);
    //this.currentConv = conv;
    this.messengerService.createConv(this.currentUser.id, conv.members).subscribe(
      (data) => {
        if(data == null) { return; }
        this.currentConv = data;
        this.allConvs.push(this.currentConv);

        this.socketService.createConv(this.currentConv);

        this.replaceMemberNames();
      }
    );
  }

  sendMsg(msg: Message) {
    //console.log("sending msg:")
    //console.log(msg);
    this.messengerService.editConv(this.currentUser.id, this.currentConv.id, msg);
    this.socketService.sendMsg(msg);
  }

}
