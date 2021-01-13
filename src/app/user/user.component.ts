import { Component, Input, OnInit } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() currentUser: User;

  constructor() {}

  ngOnInit(): void {
  }

}
