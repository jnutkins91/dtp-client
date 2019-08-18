import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

import { DTPUserService } from '../../@core/services/dtp_user.service';
import { dtp_user } from '../../@core/data/dtp_user';

@Component({
  selector: 'my-account',
  styleUrls: ['./my-account.component.scss'],
  templateUrl: './my-account.component.html',
})
export class MyAccountComponent implements OnInit {

  selectedItem: any;

  theUser: dtp_user;

  constructor (private userService: DTPUserService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: NbAuthService) {

      this.selectedItem = "gmt";

      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          console.log("Token:");
          console.log(token.getPayload());
          this.theUser = token.getPayload(); // here we receive a payload from the token and assign it to our `user` variable 
          console.log("User:");
          console.log(this.theUser);

          this.getUserData();
        }

      });
  }

  loading = false;

  ngOnInit() {

  }

  getUserData() {
    this.loading = true;
    this.userService.getUserData(this.theUser.id)
      .subscribe(

        (data: dtp_user) =>  {
          
          this.theUser = data;
          this.selectedItem = this.theUser['timezone'];
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false)
  }

  changePasswordClicked() {

    this.router.navigate(['/auth/reset-password', { }], { relativeTo: this.route });
  }

  saveClicked() {

    this.loading = true;

    this.theUser['timezone'] = this.selectedItem;

    this.userService.updateUserData(this.theUser)
          .subscribe(

            (data) => this.theUser = data,
            err => console.error('Observer got an error: ' + err),
            () => this.loading = false)

  }
}