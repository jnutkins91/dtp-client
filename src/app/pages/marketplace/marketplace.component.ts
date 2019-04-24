import { Component } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../@core/data/smart-table';

@Component({
  selector: 'marketplace',
  templateUrl: './marketplace.component.html',
})
export class MarketplaceComponent {

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

  constructor(private service: SmartTableData) {
    const data = this.service.getData();
    this.source.load(data);
  }
}
