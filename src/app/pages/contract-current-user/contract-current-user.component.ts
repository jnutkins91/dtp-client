import { Component, OnInit } from '@angular/core';

import { ContractService } from '../../@core/services/contract.service';

import { contract } from '../../@core/data/contract';
import { Router } from '@angular/router';

@Component({
  selector: 'contract-current-user',
  styleUrls: ['./contract-current-user.component.scss'],
  templateUrl: './contract-current-user.component.html',
})
export class ContractCurrentUserComponent implements OnInit {

  constructor(private router: Router,
    private contractService: ContractService) {
      
  }

  loading = false;
  offers: any;
  contracts: any;
  requests: any;

  ngOnInit() {

    this.getContracts();
  }

  getContracts() {

    this.loading = true;

    this.contractService.getMyContracts()
      .subscribe(

        (data: contract[]) => {

          this.offers = data;
          console.log(this.offers);
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
    
  }

  onClick_Contract(id: string) {
    this.router.navigateByUrl('/pages/contract-detail', { state: { itemId: id }});
  }

  newContractClicked() {
    this.router.navigateByUrl('/pages/contract-create');
  }
}
