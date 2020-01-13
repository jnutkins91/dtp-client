import { Component, OnInit } from '@angular/core';

import { ContractService } from '../../@core/services/contract.service';
import { ContractRequestService } from '../../@core/services/contractrequest.service';

import { contract } from '../../@core/data/contract';
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

    this.getContracts();
    this.getContractRequests();
  }

  getContracts() {

    this.loading = true;

    this.contractService.getMyContracts()
      .subscribe(

        (data: contract[]) => {

          this.offers = data;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);

  }

  getContractRequests() {

    this.loading = true;

    this.contractRequestService.getMyContractRequests()
      .subscribe(

        (data: contract[]) => {

          this.requests = data;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);

  }

  onClick_Contract(id: string) {
    this.router.navigate(['./pages/contract-detail', { contractId: id }]);
  }

  newContractClicked() {
    this.router.navigateByUrl('/pages/contract-create');
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
