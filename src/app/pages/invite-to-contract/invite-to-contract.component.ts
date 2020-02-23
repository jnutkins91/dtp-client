import { Component, OnInit } from '@angular/core';

import { contract_offer } from '../../@core/data/contract_offer';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Location } from '@angular/common';
import { dtp_user } from '../../@core/data/dtp_user';
import { ContractRequestService } from '../../@core/services/contractrequest.service';
import { ContractService } from '../../@core/services/contract.service';

@Component({
  selector: 'contract',
  styleUrls: ['./invite-to-contract.component.scss'],
  templateUrl: './invite-to-contract.component.html',
})
export class InviteToContractComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private contractRequestService: ContractRequestService,
    private contractService: ContractService,
    private authService: NbAuthService,
    private _location: Location,
  ) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        this.loggedIn = false;

        if (token.isValid()) {

          this.loggedIn = true;
          this.theUser = token.getPayload();
        }
      });
  }

  loading = false;
  contracts: any;

  loggedIn: boolean;
  theUser: dtp_user;
  sub: any;
  userId: number;
  userName: string;

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.userName = params['userName'];
    });

    this.getContracts();
  }

  getContracts() {

    this.loading = true;

    this.contractService.getMyContractsOffers()
      .subscribe(

        (data: contract_offer[]) => {

          this.contracts = data;

          for (var i=0; i<this.contracts.length; i++) {

            this.contracts[i].checked = false
          }
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);

  }

  createRequests() {

    let offerIds: Array<number> = []; 

    for (var i=0; i<this.contracts.length; i++) {

      if (this.contracts[i].checked === true) {
        offerIds.push(this.contracts[i].id);
      }
    }

    this.loading = true;

    this.contractRequestService.createRequests(this.userId, offerIds)
      .subscribe(

        () => {

          this._location.back();
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
  }
}
