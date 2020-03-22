import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ContractService } from '../../@core/services/contract.service';
import { contract_offer } from '../../@core/data/contract_offer';
import { ActivatedRoute, Router } from '@angular/router';
import { contract } from '../../@core/data/contract';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { dtp_user } from '../../@core/data/dtp_user';

@Component({
  selector: 'contract-purchase',
  styleUrls: ['./contract-purchase.component.scss'],
  templateUrl: './contract-purchase.component.html',
})
export class ContractPurchaseComponent implements OnInit {

  selectedCurrency: any;

  constructor(private _location: Location,
    private contractService: ContractService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: NbAuthService,
    private dialogService: NbDialogService,
    private router: Router) {

      this.contract = {} as contract

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });

    this.newContractForm = new FormGroup({
      'username': new FormControl(this.contract.username, [
        Validators.required,
      ]),
      'location_serverURL': new FormControl(this.contract.location_serverURL, [
        Validators.required,
      ]),
      'email_to_receive_data': new FormControl(this.contract.email_to_receive_data),
      'password': new FormControl(this.contract.password, [
        Validators.required,
      ]),
      'passwordConfirm': new FormControl(this.contract.passwordConfirm, [
        Validators.required,
      ]),
    });
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.contractId = +params['contractId'];
    });

    this.getContractOffer(this.contractId);
  }

  loading = false;

  sub: any;
  user: dtp_user;
  contractId: number;
  contract_offer: contract_offer;
  contract: contract;
  inputItemNgModel;
  textareaItemNgModel;
  inputItemFormControl = new FormControl();
  textareaItemFormControl = new FormControl();
  newContractForm: FormGroup;

  getContractOffer(id: number) {

    this.loading = true;

    this.contractService.getContractOffer(id.toString())
      .subscribe(

        (data: contract_offer) => {

          this.contract_offer = data;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);

  }

  accept() {

    this.loading = true;

    if (this.contract.password !== this.contract.passwordConfirm) {

      this.dialogService.open(ShowcaseDialogComponent, {
        context: {
          title: 'Passwords Don\'t Match',
        },
      });

      return;
    }

    const newContract = {

      dtp_user_id: this.user.id,
      contract_offer_id: this.contract_offer.id,
      status: 0,
      location_serverURL: this.contract.location_serverURL,
      email_to_receive_data: this.contract.email_to_receive_data,
      username: this.contract.username,
      password: this.contract.password,
    };

    console.log(newContract);

    this.contractService.newContract(newContract)
      .subscribe(

        (data: contract_offer) => {

          this.router.navigate(['./pages/contract-detail', { contractId: data.id }]);
       
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
  }
}
