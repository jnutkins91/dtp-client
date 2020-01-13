import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

import { DTPUserService } from '../../@core/services/dtp_user.service';
import { dtp_user } from '../../@core/data/dtp_user';
import { ContractService } from '../../@core/services/contract.service';
import { contract } from '../../@core/data/contract';

import { ConversationService } from '../../@core/services/conversation.service';
import { NbDialogService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
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
    private authService: NbAuthService,
    private dialogService: NbDialogService,
    private conversationService: ConversationService,
    private toastrService: NbToastrService) {

    this.selectedItem = "gmt";

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {

          this.loggedIn = true;
          this.user = token.getPayload();
        }
        else {

          this.loggedIn = false;
        }

        //this.getUserData();

      });

  }

  loading = false;
  contractsLoading = false;
  user: dtp_user;
  sub: any;
  userId: number;
  contracts: any;

  ngOnInit() {

    //this.getUserData();
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
        () => this.loading = false)
  }

  reportUserClicked() {
    
    alert("Report User Clicked!");
  }

  getContracts(id: string) {

    this.contractsLoading = true;

    this.contractService.getContractByUser(id)
      .subscribe(

        (data: contract[]) => {

          this.contracts = data;
          console.log(this.contracts);
        },
        err => console.error('Observer got an error: ' + err),
        () => this.contractsLoading = false);

  }

  onClick_Contract(id: string) {
    this.router.navigate(['./pages/contract-detail', { contractId: id }]);
  }
}