import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DirectMessagesComponent } from './direct-messages.component';
import { RepliesComponent } from './replies/reply.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    DirectMessagesComponent,
    RepliesComponent
  ],
})
export class DirectMessagesModule { }