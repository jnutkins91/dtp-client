import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DTPUserService } from '../../@core/services/dtp_user.service';
import { dtp_user } from '../../@core/data/dtp_user';

@Component({
  selector: 'users',
  styleUrls: ['./users.component.scss'],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: DTPUserService) {

  }

  p: number = 1;
  searchTerm: string = "";

  selectedDataType: boolean;

  loading = false;

  users: {
    totalUsers: 0,
    users: Array<dtp_user>,
  };

  ngOnInit() {

    this.selectedDataType = false;

    console.log(this.selectedDataType);
    this.getUsers(this.p, this.searchTerm);
  }

  showValue(searchTerm: string) {
    this.p = 1;
    this.searchTerm = searchTerm;
    this.getUsers(this.p, this.searchTerm);
  }

  getUsers(page: number, searchTerm: string) {
    this.loading = true;
    this.userService.getAllUsers(page, searchTerm)
      .subscribe(

        (data: any) => {

          this.users = data;
          console.log(this.users);
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false)
  }

  onPageChange(number: number) {
    this.getUsers(number, this.searchTerm);
  }

  onClick_User(id: string) {
    this.router.navigate(['./pages/user-profile', { userId: id }]);
  }

  onClickUserImg() {
    
  }
}
