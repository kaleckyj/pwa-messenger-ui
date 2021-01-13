import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  tryUser: User;

  @Output() tryLogin = new EventEmitter<User>();

  constructor() { }

  ngOnInit(): void {
  }

  login(usr: string, pw: string) {
    this.tryUser = {
      id: "",
      name: usr,
      password: pw
    }
    this.tryLogin.emit(this.tryUser);
  }
}
