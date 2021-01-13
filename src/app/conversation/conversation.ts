import {User} from '../user/user';
import {Message} from '../message/message';

export class Conversation {
  id: string;
  members: User[];
  messages: Message[];
}
