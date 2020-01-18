import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('userImageInput') userImageInput: ElementRef;

  selectedItem: any;

  theUser: dtp_user;

  constructor(private userService: DTPUserService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: NbAuthService) {

    this.selectedItem = 'gmt';

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.theUser = token.getPayload();

          this.getUserData();
        }

      });
  }

  loading = false;

  ngOnInit() {

  }

  editImage() {

    this.userImageInput.nativeElement.click();
  }

  fileChange(event) {

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {

      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);

      this.loading = true;
      this.userService.updateUserImage(formData)
        .subscribe(

          (data: dtp_user) => {

            this.theUser = data;
            this.selectedItem = this.theUser['timezone'];
          },
          err => console.error('Observer got an error: ' + err),
          () => this.loading = false);

    }
  }

  getUserData() {
    this.loading = true;
    this.userService.getUserData(this.theUser.id)
      .subscribe(

        (data: dtp_user) => {

          this.theUser = data;
          this.selectedItem = this.theUser['timezone'];
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
  }

  changePasswordClicked() {

    this.router.navigate(['/auth/reset-password', {}], { relativeTo: this.route });
  }

  saveClicked() {

    this.loading = true;

    this.theUser['timezone'] = this.selectedItem;

    this.userService.updateUserData(this.theUser)
      .subscribe(

        (data) => this.theUser = data,
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);

  }
}
