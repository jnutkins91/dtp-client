import { Component, OnInit } from '@angular/core';

import { ContractService } from '../../@core/services/contract.service';

import { contract } from '../../@core/data/contract';
import { Router } from '@angular/router';

@Component({
  selector: 'contract',
  styleUrls: ['./contract.component.scss'],
  templateUrl: './contract.component.html',
})
export class ContractComponent implements OnInit {

  constructor(private router: Router,
    private contractService: ContractService) {
      
  }

  loading = false;
  contracts: any;

  tagName: string;

  ngOnInit() {

    this.getContracts(history.state.itemId);
    this.tagName = history.state.tagName;
  }

  getContracts(id: string) {

    this.loading = true;

    this.contractService.getContractByTag(id)
      .subscribe(

        (data: contract[]) => {

          this.contracts = data;
          console.log(this.contracts);
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
    
  }

  onClick_Contract(id: string) {
    this.router.navigateByUrl('/pages/contract-detail', { state: { itemId: id }});
  }
}
