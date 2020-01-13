import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'nb-name-prompt',
  template: `
    <nb-card style="width: 30em;">
      <nb-card-header>New Thread:</nb-card-header>
      <nb-card-body>
        <input #name nbInput placeholder="Title" style="width: 100%;">
        <textarea #description nbInput fullWidth placeholder="Description" style="resize: none; height: 8em;"></textarea>   
      </nb-card-body>
      <nb-card-footer>
        <button nbButton status="danger" (click)="cancel()">Cancel</button>
        <button nbButton status="success" (click)="submit(name.value, description.value)" style="float: right;">Submit</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class NewThreadDialogComponent {
  
  constructor(protected dialogRef: NbDialogRef<NewThreadDialogComponent>) {
  }

  id: number;

  cancel() {
    this.dialogRef.close();
  }

  submit(title, description) {

    var newThread = {

      forum_topic_id: this.id,
      creator_id: 7,
      title: title,
      body: description,
    };

    this.dialogRef.close(newThread);
  }
}
