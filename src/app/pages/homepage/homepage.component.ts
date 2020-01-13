import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../@core/services/contract.service';
import { contract } from '../../@core/data/contract';

@Component({
  selector: 'home',
  styleUrls: ['./homepage.component.scss'],
  templateUrl: './homepage.component.html',
})
export class HomePageComponent implements OnInit {

  constructor(private contractService: ContractService) {

  }

  loading = false;
  contracts: any;

  ngOnInit() {

    this.getLatestOffers(1);
  }

  getLatestOffers(page: number) {

    this.loading = true;

    this.contractService.getLatestOffers(page)
      .subscribe(

        (data: contract[]) => {

          this.contracts = data;
          console.log(this.contracts);
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
    
  }

}
