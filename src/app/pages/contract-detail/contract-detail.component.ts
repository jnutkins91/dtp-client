import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ContractService } from '../../@core/services/contract.service';
import { contract_offer } from '../../@core/data/contract_offer';
import { Router, ActivatedRoute } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { dtp_user } from '../../@core/data/dtp_user';
import { contract_offer_comment } from '../../@core/data/contract_offer_comment';
import { NewContractCommentDialogComponent } from './newContractComment-dialog.component';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'contract-detail',
  styleUrls: ['./contract-detail.component.scss'],
  templateUrl: './contract-detail.component.html',
})
export class ContractDetailComponent implements OnInit {

  constructor(private _location: Location,
    private router: Router,
    private authService: NbAuthService,
    private dialogService: NbDialogService,
    private contractService: ContractService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });
  }

  user: dtp_user;
  loading = false;
  sub: any;
  commentsLoading = false;
  contractId: number;
  contract: contract_offer;
  contract_comments: Array<contract_offer_comment>;

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.contractId = +params['contractId'];
    });

    this.getContract(this.contractId);
  }

  searchTerm: string;

  getContract(id: number) {

    this.loading = true;

    this.contractService.getContractOffer(id.toString())
      .subscribe(

        (data: contract_offer) => {

          this.contract = data;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);

  }

  purchaseClicked(id: number) {
    this.router.navigate(['./pages/contract-purchase', { contractId: id }]);
  }

  editClicked(id: number) {
    this.router.navigate(['/pages/contract-edit'], { queryParams: { id: id, relativeTo: this.route } });
  }

  testClicked(id: number) {
    alert('Test Clicked');
  }

  activateClicked(id: number) {
    
    this.loading = true;

    this.contractService.activateContract(id)
      .subscribe(

        (data) => {

          this.contract = data;
          this.loading = false;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
  }

  suspendClicked(id: number) {

    this.loading = true;

    this.contractService.suspendContract(id)
      .subscribe(

        (data) => {

          this.contract = data;
          this.loading = false;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
  }

  terminateClicked(id: number) {

    this.loading = true;

    this.contractService.terminateContract(id)
      .subscribe(

        (data) => {

          this.contract = data;
          this.loading = false;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
  }

  newCommentClicked(id: number) {

    this.dialogService.open(
      NewContractCommentDialogComponent,
      {
        context:
        {
          contractId: this.contract.id,
          userId: this.user['id'],
        },
      })
      .onClose.subscribe(newMessage =>

        this.contractService.newContractComment(newMessage)
          .subscribe(

            (data) => {

              this.contract_comments = data;
              this.showToast_Success();
            },
            err => {
              this.showToast_Error();
              console.error('Observer got an error: ' + err);
            },
            () => this.loading = false),
      );
  }

  private showToast_Success() {

    const config = {
      status: NbToastStatus.SUCCESS,
      destroyByClick: false,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: false,
    };

    this.toastrService.show(
      '',
      'Commented!',
      config);
  }

  private showToast_Error() {

    const config = {
      status: NbToastStatus.DANGER,
      destroyByClick: false,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: false,
    };

    this.toastrService.show(
      '',
      'Failed to comment!',
      config);
  }
}
