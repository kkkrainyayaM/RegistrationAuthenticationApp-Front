import {Component, OnInit} from '@angular/core';
import {User} from '../_entities/user';
import {UserService} from '../_services/user.service';
import {StatusUpdate} from '../_entities/status-update';
import {Status} from '../_entities/status.enum';
import {TokenStorageService} from '../_services/token-storage.service';
import {remove} from 'lodash';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[];
  masterSelected: any;
  checkedUsers: number[];
  statusUpdate: StatusUpdate;

  constructor(private userService: UserService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
      },
      err => {
        this.users = JSON.parse(err.error).message;
      }
    );
    console.log(this.users);
  }

  isAllSelected() {
    // tslint:disable-next-line:only-arrow-functions
    this.masterSelected = this.users.every(function(item: any) {
      // tslint:disable-next-line:triple-equals
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }

  checkUncheckAll() {
    this.users.forEach(user => user.isSelected = this.masterSelected);
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedUsers = [];
    // tslint:disable-next-line:triple-equals
    this.users.filter(user => user.isSelected == true)
      .forEach(user => this.checkedUsers.push(user.id));
    return this.checkedUsers;
  }

  delete() {
    if (this.checkedUsers.length > 0) {
      this.userService.delete(this.checkedUsers).subscribe(
        remove(this.users, user =>
          this.checkedUsers.includes(user.id)));
    }
  }

  unblock() {
    this.updateStatus(Status.UNBLOCKED);
  }

  block() {
    this.updateStatus(Status.BLOCKED);
    this.checkUser();
  }

  updateStatus(status: Status) {
    if (this.checkedUsers.length > 0) {
      this.statusUpdate = new StatusUpdate(this.checkedUsers, status);
      this.userService.updateStatus(this.statusUpdate).subscribe(
        data => {
          remove(this.users, user =>
            this.checkedUsers.includes(user.id));
          this.users = this.users.concat(data);
          console.log(this.users);
          console.log(data);
        }
      );
    }
  }

  private checkUser() {
    if (this.checkedUsers.includes(this.tokenStorage.getUser().id)) {
      this.tokenStorage.signOut();
      this.router.navigate(['/']);
    }
  }
}
