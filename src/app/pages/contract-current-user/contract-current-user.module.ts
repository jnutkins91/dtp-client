import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ContractCurrentUserComponent } from './contract-current-user.component';

@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [
    ContractCurrentUserComponent
  ],
})
export class ContractCurrentUserModule { }