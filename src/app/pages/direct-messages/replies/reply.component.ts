import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { ConversationService } from '../../../@core/services/conversation.service';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { NewMessageDialogComponent } from './newMessage-dialog.component';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Component({
  selector: 'replies',
  styleUrls: ['./reply.component.scss'],
  templateUrl: './reply.component.html',
})
export class RepliesComponent implements OnInit {

  constructor(private conversationService: ConversationService,
    private _location: Location,
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private authService: NbAuthService) {

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

  sub: any;
  loading = false;
  conversation: any;
  conversationId: number;

  user = {};

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.conversationId = +params['conversationId']; // (+) converts string 'topicId' to a number
    });

    this.getReplies();
  }

  getReplies() {

    this.loading = true;
    this.conversationService.getConversation(this.conversationId)
      .subscribe(

        (data) => this.conversation = data,
        err => console.error('Observer got an error: ' + err),
        () => {
          //this.cd.detectChanges();
          this.loading = false;     
        }
      );
  }

  newMessageClicked() {

    //this.loading = true;

    //alert("New Thread Clicked!");
    this.dialogService.open(NewMessageDialogComponent, { context: { conversationId: this.conversationId, userId: this.user['id'] } })
      .onClose.subscribe(newMessage =>

        this.conversationService.newMessage(newMessage)
          .subscribe(

            (data) => this.conversation = data,
            err => console.error('Observer got an error: ' + err),
            () => this.loading = false)
      );
  }

  backClicked() {
    this._location.back();
  }
}
