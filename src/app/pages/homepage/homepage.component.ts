import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../@core/services/contract.service';
import { contract_offer } from '../../@core/data/contract_offer';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Router } from '@angular/router';
import { TagService } from '../../@core/services/tag.service';
import { tag } from '../../@core/data/tag';

@Component({
  selector: 'home',
  styleUrls: ['./homepage.component.scss'],
  templateUrl: './homepage.component.html',
})
export class HomePageComponent implements OnInit {

  constructor(private contractService: ContractService,
    private tagService: TagService,
    private router: Router,
    private authService: NbAuthService) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });
  }

  user = {};
  loading = false;
  loadingWatchedTags = false;
  loadingIgnoredTags = false;
  contracts: any;
  watchedTags: any;
  ignoredTags: any;
  p: number = 1;

  ngOnInit() {

    this.getLatestOffers(1);

    this.getWatchedTags();
    this.getIgnoredTags();
  }

  getLatestOffers(page: number) {

    this.loading = true;

    this.contractService.getLatestOffers(page)
      .subscribe(

        (data: contract_offer[]) => {

          this.contracts = data;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
  }

  getWatchedTags() {

    this.loadingWatchedTags = true;

    this.tagService.getWatchedTags()
      .subscribe(

        (data: tag[]) => {

          this.watchedTags = data;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loadingWatchedTags = false);
  }

  getIgnoredTags() {

    this.loadingIgnoredTags = true;

    this.tagService.getIgnoredTags()
      .subscribe(

        (data: tag[]) => {

          this.ignoredTags = data;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loadingIgnoredTags = false);
  }

  onPageChange(number: number) {
    this.getLatestOffers(number);
  }

  onClick_Contract(id: string) {

    this.router.navigate(['./pages/contract-detail', { contractId: id }]);
  }
}
