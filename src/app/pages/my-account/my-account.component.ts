import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute) {
  }

  loading = false;

  ngOnInit() {
   
    this.getUserData();
  }

  getUserData() {
    this.loading = true;
    this.userService.getUserData(7)
      .subscribe(

        (data: dtp_user) => this.theUser = data,
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false)
  }

  chagePasswordClicked() {

    this.router.navigate(['/auth/reset-password', { }], { relativeTo: this.route });
  }
}