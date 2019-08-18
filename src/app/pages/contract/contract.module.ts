import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ContractComponent } from './contract.component';

@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [
    ContractComponent
  ],
})
export class ContractModule { }