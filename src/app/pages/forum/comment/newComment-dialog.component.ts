import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'nb-comment-prompt',
  template: `
    <nb-card style="width: 30em;">
      <nb-card-header>New Comment:</nb-card-header>
      <nb-card-body>
        <textarea #description nbInput fullWidth placeholder="Description" style="resize: none; height: 8em;"></textarea>   
      </nb-card-body>
      <nb-card-footer>
        <button nbButton status="danger" (click)="cancel()">Cancel</button>
        <button nbButton status="success" (click)="submit(description.value)" style="float: right;">Submit</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class NewCommentDialogComponent {
  
  constructor(protected dialogRef: NbDialogRef<NewCommentDialogComponent>) {
  }

  id: number;

  cancel() {
    this.dialogRef.close();
  }

  submit(description) {

    var newComment = {

      thread_id: this.id,
      creator_id: 7,
      body: description
    }

    this.dialogRef.close(newComment);
  }
}