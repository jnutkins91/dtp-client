import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import { ContractService } from '../../@core/services/contract.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { dtp_user } from '../../@core/data/dtp_user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'contract-create',
  styleUrls: ['./contract-create.component.scss'],
  templateUrl: './contract-create.component.html',
})
export class ContractCreateComponent {

  selectedCurrency: any;
  selectedTimezone: any;

  user: dtp_user;

  constructor(private _location: Location,
    private formBuilder: FormBuilder,
    private authService: NbAuthService,
    private contractService: ContractService,
    private router: Router,
    private route: ActivatedRoute,
    public datepipe: DatePipe) {

    this.selectedCurrency = "usd";
    this.selectedTimezone = "gmt";

    this.newContractOfferForm = formBuilder.group({
      contract_name: this.contract_name,
      contract_description: this.contract_description,
      startDateControl: this.startDateControl,
      endDateControl: this.endDateControl,
      contract_tags: this.contract_tags,
      data_format_xlsx: this.data_format_xlsx,
      data_format_json: this.data_format_json,
      data_format_xml: this.data_format_xml,
      data_format_csv: this.data_format_csv,
      data_format_plaintext: this.data_format_plaintext,
      data_type: this.data_type,
      use_primary_wallet: [1],
      fixed_currency: this.fixed_currency,
      username: this.username,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
      location_directory: this.location_directory,
      // location_api_endpoint: this.location_api_endpoint,
      limit_contracts: this.limit_contracts,
      contract_limit: this.contract_limit,
      token_rate: this.token_rate,
      currency_rate: this.currency_rate
    });

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          console.log("Token:");
          console.log(token.getPayload());
          this.user = token.getPayload(); // here we receive a payload from the token and assign it to our `user` variable 
          console.log("User:");
          console.log(this.user);
        }

      });
  }

  loading = false;

  inputItemNgModel;
  textareaItemNgModel;
  inputItemFormControl = new FormControl();

  private newContractOfferForm: FormGroup;
  contract_name = new FormControl();
  contract_description = new FormControl();
  contract_tags = new FormControl();
  startDateControl = new FormControl();
  endDateControl = new FormControl();
  data_format_xlsx = new FormControl();
  data_format_json = new FormControl();
  data_format_xml = new FormControl();
  data_format_csv = new FormControl();
  data_format_plaintext = new FormControl();
  data_type = new FormControl();

  use_primary_wallet = new FormControl();
  fixed_currency = new FormControl();
  username = new FormControl();
  location_directory = new FormControl();
  // location_api_endpoint = new FormControl();

  password = new FormControl();
  passwordConfirm = new FormControl();

  limit_contracts = new FormControl();
  contract_limit = new FormControl();

  token_rate = new FormControl();
  currency_rate = new FormControl();

  backClicked() {
    this._location.back();
  }

  isCurrency() {

    return this.newContractOfferForm.get('fixed_currency').value || false;
  }

  limitContracts() {

    return this.newContractOfferForm.get('limit_contracts').value || false;
  }

  create() {

    //  alert(this.newContractOfferForm.get('data_type').value);

    if (this.newContractOfferForm.get('password').value != this.newContractOfferForm.get('passwordConfirm').value) {

      alert("Passwords don't match!");
      return;
    }

    var tagsToSend = [];
    var count = 0;
    for (let entry of this.newContractOfferForm.get('contract_tags').value) {

      var newTag = {
        id: count,
        name: entry['value'],
        description: ''
      }

      tagsToSend.push(newTag);

      count++;
    }

    var dataType = 0;
    if (this.newContractOfferForm.get('data_type').value == 'processed')
      dataType = 1;

    var newContract = {

      name: this.newContractOfferForm.get('contract_name').value,
      description: this.newContractOfferForm.get('contract_description').value,
      miner_id: this.user.id,
      version: 1,
      status: 0,
      wallet_id: 1,
      data_type: dataType,
      data_format_xlsx: this.newContractOfferForm.get('data_format_xlsx').value || false,
      data_format_json: this.newContractOfferForm.get('data_format_json').value || false,
      data_format_xml: this.newContractOfferForm.get('data_format_xml').value || false,
      data_format_csv: this.newContractOfferForm.get('data_format_csv').value || false,
      data_format_plain_text: this.newContractOfferForm.get('data_format_plaintext').value || false,

      use_primary_wallet: this.newContractOfferForm.get('use_primary_wallet').value || false,
      fixed_currency: this.newContractOfferForm.get('fixed_currency').value || false,
      location_directory: this.newContractOfferForm.get('location_directory').value,
      location_api_endpoint: '',
      username: this.newContractOfferForm.get('username').value, 

      password: this.newContractOfferForm.get('password').value,

      contract_limit: this.newContractOfferForm.get('contract_limit').value,
      
      token_rate: this.newContractOfferForm.get('token_rate').value,
      currency_rate: this.newContractOfferForm.get('currency_rate').value,

      startdate: this.newContractOfferForm.get('startDateControl').value,
      enddate: this.newContractOfferForm.get('endDateControl').value,

      currency: this.selectedCurrency,
      timezone: this.selectedTimezone,
      
      tags: tagsToSend
    }



    this.contractService.newContractOffer(newContract)
      .subscribe(

        (data) => {
          this.router.navigateByUrl('/pages/contract-detail', { replaceUrl: true, state: { itemId: data['id'] }});
        }, //this.theUser = data,
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
  }

}
