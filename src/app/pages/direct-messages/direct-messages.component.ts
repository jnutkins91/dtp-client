import { Component } from '@angular/core';

import { ConversationService } from '../../@core/services/conversation.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { dtp_user } from '../../@core/data/dtp_user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'direct-messages',
  styleUrls: ['./direct-messages.component.scss'],
  templateUrl: './direct-messages.component.html',
})
export class DirectMessagesComponent {

  theUser: dtp_user;

  constructor(private conversationService: ConversationService,
    private authService: NbAuthService,
    private route: ActivatedRoute,
    private router: Router) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          console.log("Token:");
          console.log(token.getPayload());
          this.theUser = token.getPayload(); // here we receive a payload from the token and assign it to our `user` variable 
          console.log("User:");
          console.log(this.theUser);

          this.getConversations(this.theUser.id);
        }

      });
  }

  loading = false;
  conversations: any;

  getConversations(userId: number) {

    this.loading = true;
    this.conversationService.getConversationsForUser(userId)
      .subscribe(

        (data) => this.conversations = data,
        err => console.error('Observer got an error: ' + err),
        () => {
          //this.cd.detectChanges();
          this.loading = false;     
        }
      );
  }

  conversationClicked(id: number) {

    this.router.navigate(['../replies', { conversationId: id }], { relativeTo: this.route });
  }
}
