import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import { ContractService } from '../../@core/services/contract.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { dtp_user } from '../../@core/data/dtp_user';
import { Router } from '@angular/router';
import { contract } from '../../@core/data/contract';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'contract-create',
  styleUrls: ['./contract-create.component.scss'],
  templateUrl: './contract-create.component.html',
})
export class ContractCreateComponent {

  selectedCurrency: any;
  selectedTimezone: any;

  user: dtp_user;
  contract: contract;
  passwordConfirm: string;
  data_type = 'raw';
  limit_contracts = false;

  loading = false;

  inputItemNgModel;
  textareaItemNgModel;
  inputItemFormControl = new FormControl();

  newContractOfferForm: FormGroup;

  constructor(private _location: Location,
    private formBuilder: FormBuilder,
    private authService: NbAuthService,
    private contractService: ContractService,
    private router: Router,
    public datepipe: DatePipe,
    private dialogService: NbDialogService) {

    this.contract = {} as contract;

    this.contract.token_rate = 0;
    this.contract.currency_rate = 0;
    this.contract.contract_limit = 0;

    this.selectedCurrency = 'usd';
    this.selectedTimezone = 'gmt';

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });

    this.newContractOfferForm = new FormGroup({
      'contract_name': new FormControl(this.contract.name, [
        Validators.required,
        Validators.minLength(10),
      ]),
      'description': new FormControl(this.contract.description, [
        Validators.required,
        Validators.minLength(25),
      ]),
      'contract_tags': new FormControl(this.contract.tags),

      'data_type': new FormControl(this.contract.data_type),

      'data_format_xlsx': new FormControl(this.contract.data_format_xlsx),
      'data_format_json': new FormControl(this.contract.data_format_json),
      'data_format_xml': new FormControl(this.contract.data_format_xml),
      'data_format_csv': new FormControl(this.contract.data_format_csv),
      'data_format_plain_text': new FormControl(this.contract.data_format_plain_text),


      'startDateControl': new FormControl(this.contract.startdate, [
        Validators.required,
      ]),
      'endDateControl': new FormControl(this.contract.enddate, [
        Validators.required,
      ]),
      'use_primary_wallet': new FormControl(this.contract.use_primary_wallet),
      'fixed_currency': new FormControl(this.contract.fixed_currency),
      'username': new FormControl(this.contract.username, [
        Validators.required,
      ]),
      'location_directory': new FormControl(this.contract.location_directory),

      'password': new FormControl(this.contract.password, [
        Validators.required,
      ]),
      'passwordConfirm': new FormControl(this.contract.passwordConfirm, [
        Validators.required,
      ]),

      'limit_contracts': new FormControl(),
      'contract_limit': new FormControl(this.contract.contract_limit),

      'timezone': new FormControl(this.contract.timezone),

      'token_rate': new FormControl(this.contract.token_rate),
      'currency_rate': new FormControl(this.contract.currency_rate),

    });
  }

  backClicked() {
    this._location.back();
  }

  isCurrency() {

    return this.contract.fixed_currency || false;
  }

  limitContracts() {

    return this.limit_contracts || false;
  }

  create() {

    if (this.contract.password !== this.contract.passwordConfirm) {

      this.dialogService.open(ShowcaseDialogComponent, {
        context: {
          title: 'Passwords Don\'t Match',
        },
      });

      return;
    }

    let tagsToSend = [];
    let count = 0;

    if (this.contract.tags === undefined || this.contract.tags.length === 0) {
      this.dialogService.open(ShowcaseDialogComponent, {
        context: {
          title: 'Contract\'s Require Atleast 1 Tag',
        },
      });

      return;
    }

    for (let entry of this.contract.tags) {

      const newTag = {
        id: count,
        name: entry['value'],
        description: '',
      };

      tagsToSend.push(newTag);

      count++;
    }

    if (this.contract.startdate === undefined || this.contract.enddate === undefined) {
      this.dialogService.open(ShowcaseDialogComponent, {
        context: {
          title: 'Contract\'s Require a Start and End Date',
        },
      });

      return;
    }

    if (this.contract.data_format_csv === false
      && this.contract.data_format_json === false
      && this.contract.data_format_plain_text === false
      && this.contract.data_format_xlsx === false
      && this.contract.data_format_xml === false) {
      this.dialogService.open(ShowcaseDialogComponent, {
        context: {
          title: 'Contract\'s Require Atleast 1 Data Format',
        },
      });

      return;
    }

    let local_data_type = 0;
    if (this.data_type === 'processed')
      local_data_type = 1;

    const newContract = {

      name: this.contract.name,
      description: this.contract.description,
      miner_id: this.user.id,
      version: 1,
      status: 0,
      wallet_id: 1,
      data_type: local_data_type,
      data_format_xlsx: this.contract.data_format_xlsx,
      data_format_json: this.contract.data_format_json,
      data_format_xml: this.contract.data_format_xml,
      data_format_csv: this.contract.data_format_csv,
      data_format_plain_text: this.contract.data_format_plain_text,

      use_primary_wallet: this.contract.use_primary_wallet,
      fixed_currency: this.contract.fixed_currency,
      location_directory: this.contract.location_directory,
      location_api_endpoint: '',
      username: this.contract.username,

      password: this.contract.password,

      contract_limit: this.contract.contract_limit,

      token_rate: this.contract.token_rate,
      currency_rate: this.contract.currency_rate,

      startdate: this.contract.startdate,
      enddate: this.contract.enddate,

      currency: this.contract.currency,
      timezone: this.contract.timezone,

      is_private: this.contract.is_private,

      tags: tagsToSend,
    };

    this.contractService.newContractOffer(newContract)
      .subscribe(

        (data) => {
          this.router.navigateByUrl('/pages/contract-detail', { replaceUrl: true, state: { itemId: data['id'] } });
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
  }

}
