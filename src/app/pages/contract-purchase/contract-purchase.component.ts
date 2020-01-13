import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'contract-purchase',
  styleUrls: ['./contract-purchase.component.scss'],
  templateUrl: './contract-purchase.component.html',
})
export class ContractPurchaseComponent {

  selectedCurrency: any;

  constructor(private _location: Location) {
      
    this.selectedCurrency = 'usd';
  }

  loading = false;

  inputItemNgModel;
  textareaItemNgModel;
  inputItemFormControl = new FormControl();
  textareaItemFormControl = new FormControl();

  backClicked() {
    this._location.back();
  }

}
