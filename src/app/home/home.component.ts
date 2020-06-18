import {Component, OnInit} from '@angular/core';
import {User} from '../_entities/user';
import {UserService} from '../_services/user.service';
import {StatusUpdate} from '../_entities/status-update';
import {Status} from '../_entities/status.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  updatedUsers: User[];
  users: User[];
  masterSelected: any;
  checkedUsers: number[];
  statusUpdate: StatusUpdate;

  constructor(private userService: UserService) {
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
    this.updatedUsers = [];
    if (this.checkedUsers.length > 0) {
      this.userService.delete(this.checkedUsers);
      this.users.filter(user => this.checkedUsers.includes(user.id) === false)
        .forEach(user => this.updatedUsers.push(user));
      this.users = [];
      this.users = this.updatedUsers;
    }
  }

  unblock() {
    if (this.checkedUsers.length > 0) {
      this.statusUpdate = new StatusUpdate(this.checkedUsers, Status.UNBLOCKED);
      this.userService.updateStatus(this.statusUpdate).subscribe(
        data => this.users = this.users.concat(data)
      );
      console.log('unblock' + this.users);
    }
  }

  block() {
    console.log(this.checkedUsers.length);
    if (this.checkedUsers.length > 0) {
      this.statusUpdate = new StatusUpdate(this.checkedUsers, Status.BLOCKED);
      this.userService.updateStatus(this.statusUpdate).subscribe(
        data => this.users = this.users.concat(data)
      );
    }
  }
}
