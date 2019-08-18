import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { ContractService } from '../../@core/services/contract.service';

import { contract } from '../../@core/data/contract';
import { Router } from '@angular/router';

@Component({
  selector: 'contract-current-user',
  styleUrls: ['./contract-current-user.component.scss'],
  templateUrl: './contract-current-user.component.html',
})
export class ContractCurrentUserComponent implements OnInit {

  constructor(private _location: Location,
    private router: Router,
    private contractService: ContractService) {
      
  }

  loading = false;
  offers: any;
  contracts: any;
  requests: any;

  ngOnInit() {

    console.log(history.state.itemId);
    this.getContracts(history.state.itemId);
  }

  getContracts(id: string) {

    this.loading = true;

    this.contractService.getContractByUser(id)
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

  backClicked() {
    this._location.back();
  }

  newContractClicked() {
    this.router.navigateByUrl('/pages/contract-create');
  }
}
