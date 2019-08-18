import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'nb-message-prompt',
  template: `
    <nb-card style="width: 30em;">
      <nb-card-header>New Message:</nb-card-header>
      <nb-card-body>
        <textarea #reply nbInput fullWidth placeholder="Message" style="resize: none; height: 8em;"></textarea>   
      </nb-card-body>
      <nb-card-footer>
        <button nbButton status="danger" (click)="cancel()">Cancel</button>
        <button nbButton status="success" (click)="submit(reply.value)" style="float: right;">Send</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class NewMessageDialogComponent {
  
  constructor(protected dialogRef: NbDialogRef<NewMessageDialogComponent>) {
  }

  conversationId: number;
  userId: string;
  messageToId: number;

  cancel() {
    this.dialogRef.close();
  }

  submit(reply) {

    var newMessage = {

      conversation_id: this.conversationId,
      user_id: this.userId,
      reply: reply,
      message_to_id: this.messageToId
    }

    this.dialogRef.close(newMessage);
  }
}