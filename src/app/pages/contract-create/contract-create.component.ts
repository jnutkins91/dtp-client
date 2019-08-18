import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { contract } from '../../@core/data/contract';
import { ContractService } from '../../@core/services/contract.service';

@Component({
  selector: 'contract-create',
  styleUrls: ['./contract-create.component.scss'],
  templateUrl: './contract-create.component.html',
})
export class ContractCreateComponent {

  selectedCurrency: any;

  constructor(private _location: Location,
    private formBuilder: FormBuilder,
    private contractService: ContractService) {

    this.selectedCurrency = "usd";

    this.newContractOfferForm = formBuilder.group({
      contract_name: this.contract_name
    })
  }

  loading = false;

  inputItemNgModel;
  textareaItemNgModel;
  inputItemFormControl = new FormControl();

  private newContractOfferForm: FormGroup;
  contract_name = new FormControl();

  backClicked() {
    this._location.back();
  }

  //contract_name: string;

  create() {

    var newContract = {

      name: 'SUCCESS',
      description: 'A successul description.',
      miner_id: 7,
      version: 1,
      status: 2,
      wallet_id: 1
    }

    //alert(this.newContractOfferForm.get('contract_name').value);

    this.contractService.newContractOffer(newContract)
          .subscribe(

            (data) =>  alert("Success!"), //this.theUser = data,
            err => console.error('Observer got an error: ' + err),
            () => this.loading = false)
  }

}
