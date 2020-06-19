import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './_services/token-storage.service';
import {MessageService} from './_services/message-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  username: string;
  subscription: any;

  constructor(private tokenStorageService: TokenStorageService,
              private messageService: MessageService) {
    this.subscription = this.messageService.getMessage()
      .subscribe(message => {
        this.isLoggedIn = message;
        if (this.isLoggedIn) {
          this.ngOnInit();
        } else {
          this.logout();
        }
      });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
