import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {SelectButtonModule} from 'primeng/selectbutton';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { ConversationComponent } from './conversation/conversation.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { ContactsComponent } from './contacts/contacts.component';

const config: SocketIoConfig = { url: 'https://pwa-kalecky-api.herokuapp.com/', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ConversationComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    ButtonModule,
    InputTextModule,
    ScrollPanelModule,
    ProgressSpinnerModule,
    SelectButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
