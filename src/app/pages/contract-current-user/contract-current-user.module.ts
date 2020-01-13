import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ContractCurrentUserComponent } from './contract-current-user.component';
import { NbBadgeModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    NbBadgeModule,
  ],
  declarations: [
    ContractCurrentUserComponent,
  ],
})
export class ContractCurrentUserModule { }