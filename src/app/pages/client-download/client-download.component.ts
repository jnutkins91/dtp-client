import { Component, OnInit } from '@angular/core';

import { ContractService } from '../../@core/services/contract.service';

import { contract_offer } from '../../@core/data/contract_offer';
import { Router, ActivatedRoute } from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { dtp_user } from '../../@core/data/dtp_user';

@Component({
  selector: 'client-download',
  styleUrls: ['./client-download.component.scss'],
  templateUrl: './client-download.component.html',
})
export class ClientDownloadComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private contractService: ContractService,
    private authService: NbAuthService) {

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

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.userId = params['userId'];
    });

    this.getContracts();
  }

  getContracts() {

    this.loading = true;

    this.contractService.getMyContractsOffers()
      .subscribe(

        (data: contract_offer[]) => {

          this.contracts = data;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);

  }
}
