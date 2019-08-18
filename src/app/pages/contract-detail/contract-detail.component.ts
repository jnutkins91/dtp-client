import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ContractService } from '../../@core/services/contract.service';
import { contract } from '../../@core/data/contract';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { dtp_user } from '../../@core/data/dtp_user';
import { contract_offer_comment } from '../../@core/data/contract_offer_comment';

@Component({
  selector: 'contract-detail',
  styleUrls: ['./contract-detail.component.scss'],
  templateUrl: './contract-detail.component.html',
})
export class ContractDetailComponent implements OnInit {

  constructor(private _location: Location,
    private router: Router,
    private authService: NbAuthService,
    private contractService: ContractService) {

      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          console.log("Token:");
          console.log(token.getPayload());
          this.user = token.getPayload(); // here we receive a payload from the token and assign it to our `user` variable 
          console.log("User:");
          console.log(this.user);
        }

      });
  }

  user: dtp_user;
  loading = false;
  commentsLoading = false;
  contract: contract;
  contract_comments: Array<contract_offer_comment>;
  //itemId: any;

  ngOnInit() {


    this.getContract(history.state.itemId);
    this.getContractComments(history.state.itemId);
  }

  getContract(id: string) {

    this.loading = true;

    this.contractService.getContract(id)
      .subscribe(

        (data: contract) => {

          this.contract = data;
          console.log(this.contract);
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);

  }

  getContractComments(id: string) {

    this.commentsLoading = true;

    this.contractService.getContractComments(id)
      .subscribe(

        (data: Array<contract_offer_comment>) => {

          this.contract_comments = data;
          console.log(this.contract);
        },
        err => console.error('Observer got an error: ' + err),
        () => this.commentsLoading = false);

  }

  backClicked() {
    this._location.back();
  }

  purchaseClicked(id: number) {
    this.router.navigateByUrl('/pages/contract-purchase', { state: { itemId: id }});
  }

  editClicked(id: number) {
    alert("Edit Clicked");
  }

  testClicked(id: number) {
    alert("Test Clicked");
  }

}
