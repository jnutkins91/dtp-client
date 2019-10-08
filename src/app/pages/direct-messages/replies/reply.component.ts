import { Component, OnInit } from '@angular/core';

import { ConversationService } from '../../../@core/services/conversation.service';
import { ActivatedRoute } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { dtp_user } from '../../../@core/data/dtp_user';

@Component({
  selector: 'replies',
  styleUrls: ['./reply.component.scss'],
  templateUrl: './reply.component.html',
})
export class RepliesComponent implements OnInit {

  constructor(private conversationService: ConversationService,
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

  user: dtp_user;

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

  sendMessage(event: any) {

    var newMessage = {
      conversation_id: this.conversationId,
      user_id: this.user.id,
      reply: event.message,
      message_to_id: 8
    };

    this.conversationService.newMessage(newMessage)
          .subscribe(

            (data) => this.conversation = data,
            err => console.error('Observer got an error: ' + err),
            () => this.loading = false)
  }
}
