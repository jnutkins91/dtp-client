import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'nb-message-prompt',
  template: `
    <nb-card style="width: 30em;">
      <nb-card-header>New Comment</nb-card-header>
      <nb-card-body>
        <textarea #reply nbInput fullWidth placeholder="Comment" style="resize: none; height: 8em;"></textarea>   
      </nb-card-body>
      <nb-card-footer>
        <button nbButton status="danger" (click)="cancel()">Cancel</button>
        <button nbButton status="success" (click)="submit(reply.value)" style="float: right;">Send</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class NewContractCommentDialogComponent {
  
  constructor(protected dialogRef: NbDialogRef<NewContractCommentDialogComponent>) {
  }

  contractId: number;
  userId: number;

  cancel() {
    this.dialogRef.close();
  }

  submit(reply) {

    var newContractComment = {

      creator_id: this.userId,
      body: reply,
      contract_offer_id: this.contractId,
    }

    this.dialogRef.close(newContractComment);
  }
}