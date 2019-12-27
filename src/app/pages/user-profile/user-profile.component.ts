import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

import { DTPUserService } from '../../@core/services/dtp_user.service';
import { dtp_user } from '../../@core/data/dtp_user';
import { ContractService } from '../../@core/services/contract.service';
import { contract } from '../../@core/data/contract';

import { NewMessageDialogComponent } from '../direct-messages/replies/newMessage-dialog.component';
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

        this.getUserData();

      });

  }

  loading = false;
  contractsLoading = false;
  user: dtp_user;
  contracts: any;

  ngOnInit() {

    //this.getUserData();
  }

  getUserData() {
    this.loading = true;
    this.userService.getOtherUserData(history.state.itemId)
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

  onClick_SendMessage() {

    this.dialogService.open(NewMessageDialogComponent, { context: JSON.stringify({ conversationId: null, userId: this.user["id"], messageToId: this.theUser.id }) })
      .onClose.subscribe(newMessage =>

        this.conversationService.newMessage(newMessage)
          .subscribe(

            (data) => this.showToast_Success(),
            err => {
              this.showToast_Error();
              console.error('Observer got an error: ' + err)
            },
            () => this.loading = false)
      );
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

    //this.index += 1;
    this.toastrService.show(
      '',
      'Message sent!',
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

    //this.index += 1;
    this.toastrService.show(
      '',
      'Error sending message!',
      config);
  }

  onClick_Contract(id: string) {
    this.router.navigateByUrl('/pages/contract-detail', { state: { itemId: id } });
  }
}