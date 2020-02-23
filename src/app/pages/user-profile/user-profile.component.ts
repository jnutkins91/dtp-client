import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

import { DTPUserService } from '../../@core/services/dtp_user.service';
import { dtp_user } from '../../@core/data/dtp_user';
import { ContractService } from '../../@core/services/contract.service';
import { contract_offer } from '../../@core/data/contract_offer';
import { ReportUserService } from '../../@core/services/reportuser.service';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ReportUserDialogComponent } from '../dialogs/reportuser-dialog.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'user-profile',
  styleUrls: ['./user-profile.component.scss'],
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {

  selectedItem: any;

  loggedIn: boolean;
  theUser: dtp_user;

  constructor(private userService: DTPUserService,
    private router: Router,
    private route: ActivatedRoute,
    private contractService: ContractService,
    private reportUserService: ReportUserService,
    private dialogService: NbDialogService,
    private authService: NbAuthService,
    private toastrService: NbToastrService) {

    this.selectedItem = 'gmt';

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        this.loggedIn = false;

        if (token.isValid()) {

          this.loggedIn = true;
          this.user = token.getPayload();
        }
      });
  }

  loading = false;
  contractsLoading = false;
  user: dtp_user;
  sub: any;
  userId: number;
  contracts: any;

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['userId'];
    });

    this.getUserData();
  }

  getUserData() {
    this.loading = true;
    this.userService.getOtherUserData(this.userId)
      .subscribe(

        (data: dtp_user) => {

          this.theUser = data;
          this.selectedItem = this.theUser['timezone'];
          this.getContracts(this.theUser['id'].toString());
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
  }

  reportUserClicked() {

    this.dialogService.open(ReportUserDialogComponent, { context: { userId: this.userId, currentUserId:  this.user.id } })
      .onClose.subscribe(newReport =>

        this.reportUserService.createReportUser(newReport)
          .subscribe(

            (data: any) => {

              this.showToast_Success();
            },
            err => this.showToast_Error(),
            () => {}),
      );
  }

  inviteToContractClicked(id: number, name: string) {
    this.router.navigate(['./pages/invite-to-contract', { userId: id, userName: name }]);
  }

  getContracts(id: string) {

    this.contractsLoading = true;

    this.contractService.getContractByUser(id)
      .subscribe(

        (data: contract_offer[]) => {

          this.contracts = data;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.contractsLoading = false);

  }

  onClick_Contract(id: string) {
    this.router.navigate(['./pages/contract-detail', { userId: id }]);
  }

  private showToast_Success() {

    const config = {
      status: NbToastStatus.SUCCESS,
      destroyByClick: false,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: false,
    };

    this.toastrService.show(
      '',
      'User Reported!',
      config);
  }

  private showToast_Error() {

    const config = {
      status: NbToastStatus.DANGER,
      destroyByClick: false,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: false,
    };

    this.toastrService.show(
      '',
      'Failed to Report!',
      config);
  }
}
