import { Injectable } from '@angular/core';
import {User} from '../_entities/user';
import {MessageService} from './message-service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private messageService: MessageService) { }

  signOut() {
    this.messageService.updateMessage(false);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: User) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.messageService.updateMessage(true);
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}
