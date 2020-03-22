import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import { ContractService } from '../../@core/services/contract.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { dtp_user } from '../../@core/data/dtp_user';
import { Router, ActivatedRoute } from '@angular/router';
import { contract_offer } from '../../@core/data/contract_offer';
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
  subscriptionType: any;

  user: dtp_user;
  contract: contract_offer;
  passwordConfirm: string;
  pageTitle: string;
  data_type = 'raw';
  limit_contracts = false;
  sub: any;
  contractId: number;

  loading = false;

  inputItemNgModel;
  textareaItemNgModel;
  inputItemFormControl = new FormControl();

  newContractOfferForm: FormGroup;

  files = new Array();
  formData: FormData = new FormData();

  @ViewChild('fileUploadInput') fileUploadInput: ElementRef;

  constructor(private _location: Location,
    private formBuilder: FormBuilder,
    private authService: NbAuthService,
    private contractService: ContractService,
    private router: Router,
    public datepipe: DatePipe,
    private dialogService: NbDialogService,
    private route: ActivatedRoute) {

    this.contract = {} as contract_offer;
    this.contract.use_primary_wallet = true;

    this.contract.token_rate = 0;
    this.contract.currency_rate = 0;

    this.selectedCurrency = 'usd';
    this.selectedTimezone = 'gmt';
    this.subscriptionType = 'one-off';

    this.contract.currency = 'usd';
    this.contract.timezone = 'gmt';
    this.contract.subscriptionType = 'one-off';

    this.pageTitle = "Create a New Contract Offer for Data Services";

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
        Validators.maxLength(125)
      ]),
      'description': new FormControl(this.contract.description, [
        Validators.required,
        Validators.minLength(25),
        Validators.maxLength(1000)
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
      'location_serverURL': new FormControl(this.contract.location_serverURL, [
        Validators.required,
      ]),

      'password': new FormControl(this.contract.password, [
        Validators.required,
      ]),
      'passwordConfirm': new FormControl(this.contract.passwordConfirm, [
        Validators.required,
      ]),

      'timezone': new FormControl(this.contract.timezone),

      'token_rate': new FormControl(this.contract.token_rate),
      'currency_rate': new FormControl(this.contract.currency_rate),

      'test_serverURL': new FormControl(this.contract.test_serverURL, [
        Validators.required,
      ]),
      'test_email': new FormControl(this.contract.test_email),
      'test_username': new FormControl(this.contract.test_username, [
        Validators.required,
      ]),
      'test_password': new FormControl(this.contract.test_password, [
        Validators.required,
      ]),
      'test_passwordConfirm': new FormControl(this.contract.test_passwordConfirm, [
        Validators.required,
      ]),

    });
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {

      if (!isNaN(+params['contractId'])) {
        this.contractId = +params['contractId'];
        this.pageTitle = "Edit a Contract Offer for Data Services";
        this.getContract(this.contractId);
      }
    });
  }

  getContract(id: number) {

    this.loading = true;

    this.contractService.getContractOffer(id.toString())
      .subscribe(

        (data: contract_offer) => {

          this.contract = data;

          if (this.contract.data_type === true)
            this.data_type = 'processed'
          else
            this.data_type = 'raw'

          let tags = [];

          for (let entry of this.contract.tags) {

            const newTag = {
              display: entry['name'],
              value: entry['name'],
              description: entry['description'],
            };

            tags.push(newTag);
          }

          this.selectedTimezone = this.contract.timezone;
          this.selectedCurrency = this.contract.currency;
          this.subscriptionType = this.contract.subscriptionType;

          this.contract.tags = tags;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);

  }

  backClicked() {
    this._location.back();
  }

  limitContracts() {

    return this.limit_contracts || false;
  }

  uploadDocument() {

    this.fileUploadInput.nativeElement.click();
  }

  fileChange(event) {

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {

      let file: File = fileList[0];

      this.formData.append('uploadFile', file, file.name);

      this.files.push(file);

      console.log(this.files);

    }
  }

  setTokenValue() {

    //  5 Tokens = 1 GBP

    if (this.contract.currency === "gbp") {
      this.contract.token_rate = this.contract.currency_rate * 5;
    }
    else if (this.contract.currency === "usd") {
      this.contract.token_rate = this.contract.currency_rate * 4;
    }
    else if (this.contract.currency === "eur") {
      this.contract.token_rate = this.contract.currency_rate * 4.5;
    }
  }

  setCurrencyValue() {

    //  5 Tokens = 1 GBP

    if (this.contract.currency === "gbp") {
      this.contract.currency_rate = this.contract.token_rate / 5;
    }
    else if (this.contract.currency === "usd") {
      this.contract.currency_rate = this.contract.token_rate / 4;
    }
    else if (this.contract.currency === "eur") {
      this.contract.currency_rate = this.contract.token_rate / 4.5;
    }
  }

  create() {

    this.loading = true;

    if (this.contract.password !== this.contract.passwordConfirm) {

      this.dialogService.open(ShowcaseDialogComponent, {
        context: {
          title: 'Passwords Don\'t Match',
        },
      });

      this.loading = true;

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

      this.loading = true;

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

      this.loading = true;

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

      this.loading = true;

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
      location_serverURL: this.contract.location_serverURL,
      username: this.contract.username,

      password: this.contract.password,

      token_rate: this.contract.token_rate,
      currency_rate: this.contract.currency_rate,

      startdate: this.contract.startdate,
      enddate: this.contract.enddate,

      currency: this.contract.currency,
      timezone: this.contract.timezone,

      is_private: this.contract.is_private,
      subscriptionType: this.contract.subscriptionType,

      tags: tagsToSend,

      test_serverURL: this.contract.test_serverURL,
      test_email: this.contract.test_email,
      test_username: this.contract.test_username,
      test_password: this.contract.test_password,
    };

    this.contractService.newContractOffer(newContract)
      .subscribe(

        (data: contract_offer) => {

          this.contractService.newContractOfferFile(this.formData, data.id)
            .subscribe(

              () => {

                this.router.navigate(['./pages/contract-detail', { contractId: data.id }]);
              },
              err => console.error('Observer got an error: ' + err),
              () => this.loading = false);


        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
  }

}
