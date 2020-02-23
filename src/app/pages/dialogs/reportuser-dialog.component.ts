import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'nb-message-prompt',
  template: `
    <nb-card style="width: 30em;">
      <nb-card-header>Report User</nb-card-header>
      <nb-card-body>
        <textarea #body nbInput fullWidth placeholder="Why are you reporting this user?" style="resize: none; height: 8em;"></textarea>
        </nb-card-body>
      <nb-card-footer>
        <button nbButton status="danger" (click)="cancel()">Cancel</button>
        <button nbButton status="success" (click)="submit(body.value)" style="float: right;">Send</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class ReportUserDialogComponent {

  constructor(protected dialogRef: NbDialogRef<ReportUserDialogComponent>) {
  }

  userId: number;
  currentUserId: number;

  cancel() {
    this.dialogRef.close();
  }

  submit(body) {

    var newUserReport = {

      reported_by_id: this.currentUserId,
      body: body,
      reported_user_id: this.userId,
    };

    this.dialogRef.close(newUserReport);
  }
}
