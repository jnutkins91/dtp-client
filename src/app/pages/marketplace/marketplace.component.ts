import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../@core/data/smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { tag } from '../../@core/data/tag';

@Component({
  selector: 'marketplace',
  styleUrls: ['./marketplace.component.scss'],
  templateUrl: './marketplace.component.html',
})
export class MarketplaceComponent implements OnInit {

  settings = {
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    noDataMessage: "No Contracts Found!",
    actions: {

      add: false,
      edit: false,
      delete: false
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      contractName: {
        title: 'Contract Name',
        type: 'string',
      },
      minerProcessor: {
        title: 'Miner/Processor',
        type: 'string',
      },
      tournament: {
        title: 'Tournament',
        type: 'string',
      },
      feedFrequency: {
        title: 'Feed Frequency',
        type: 'string',
      },
      startDate: {
        title: 'Start Date',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableData,
    private router: Router,
    private route: ActivatedRoute) {

    const data = this.service.getData();
    this.source.load(data);
  }

  selectedDataType: boolean;

  loading = false;
  tags: Array<tag>;

  ngOnInit() {

    this.selectedDataType = false;

    console.log(this.selectedDataType);
  }

  onUserRowSelect(event): void {
    console.log(event);
    this.router.navigate(['/pages/marketplace/marketplace-detail', { }], { relativeTo: this.route });
  }
}
