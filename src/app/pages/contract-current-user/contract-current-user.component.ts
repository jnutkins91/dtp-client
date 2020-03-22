import { Component, OnInit } from '@angular/core';

import { ContractService } from '../../@core/services/contract.service';
import { ContractRequestService } from '../../@core/services/contractrequest.service';

import { contract_offer } from '../../@core/data/contract_offer';
import { Router } from '@angular/router';

@Component({
  selector: 'contract-current-user',
  styleUrls: ['./contract-current-user.component.scss'],
  templateUrl: './contract-current-user.component.html',
})
export class ContractCurrentUserComponent implements OnInit {

  constructor(private router: Router,
    private contractService: ContractService,
    private contractRequestService: ContractRequestService) {

  }

  loading = false;
  offers: any;
  contracts: any;
  requests: any;

  ngOnInit() {

    this.getContractOffers();
    this.getContracts();
    this.getContractRequests();  
  }

  getContractOffers() {

    this.loading = true;

    this.contractService.getMyContractsOffers()
      .subscribe(

        (data: contract_offer[]) => {

          this.offers = data;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);

  }

  getContracts() {

    this.loading = true;

    this.contractService.getMyContracts()
      .subscribe(

        (data: contract_offer[]) => {

          this.contracts = data;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);

  }

  getContractRequests() {

    this.loading = true;

    this.contractRequestService.getMyContractRequests()
      .subscribe(

        (data: contract_offer[]) => {

          this.requests = data;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);

  }

  onClick_Contract(id: string) {
    this.router.navigate(['./pages/contract-detail', { contractId: id }]);
  }

  newContractClicked() {
    this.router.navigate(['./pages/contract-create', { contractId: null }]);
  }

  acceptContractRequest(id: number) {

    this.loading = true;

    this.contractRequestService.acceptRequest(id)
      .subscribe(

        (data) => {

          this.requests = data;
          this.loading = false;
        },
        err => {
          alert(err.error);
          this.loading = false;
        },
        () => this.loading = false);
  }

  rejectContractRequest(id: number) {

    this.loading = true;

    this.contractRequestService.rejectRequest(id)
      .subscribe(

        (data) => {

          this.requests = data;
          alert('Rejected Success!');
          this.loading = false;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
  }
}
