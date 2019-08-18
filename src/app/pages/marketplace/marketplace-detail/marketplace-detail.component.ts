import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'marketplace-detail',
  styleUrls: ['./marketplace-detail.component.scss'],
  templateUrl: './marketplace-detail.component.html',
})
export class MarketplaceDetailComponent {

  constructor(private _location: Location) {
    
  }

  backClicked() {
    this._location.back();
  }
}
