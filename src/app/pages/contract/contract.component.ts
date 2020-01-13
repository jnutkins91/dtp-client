import { Component, OnInit } from '@angular/core';

import { ContractService } from '../../@core/services/contract.service';

import { contract } from '../../@core/data/contract';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'contract',
  styleUrls: ['./contract.component.scss'],
  templateUrl: './contract.component.html',
})
export class ContractComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private contractService: ContractService) {

  }

  loading = false;
  contracts: any;

  sub: any;
  tagName: string;
  tagId: number;

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.tagName = params['tagName'];
      this.tagId = +params['tagId'];
    });

    this.getContracts(this.tagId);
  }

  getContracts(id: number) {

    this.loading = true;

    this.contractService.getContractByTag(id.toString())
      .subscribe(

        (data: contract[]) => {

          this.contracts = data;
          console.log(this.contracts);
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);

  }

  onClick_Contract(id: string) {

    this.router.navigate(['./pages/contract-detail', { contractId: id }]);
  }
}
