import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { InviteToContractComponent } from './invite-to-contract.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    InviteToContractComponent,
  ],
})
export class InviteToContractModule { }
