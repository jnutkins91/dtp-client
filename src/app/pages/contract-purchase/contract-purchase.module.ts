import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ContractPurchaseComponent } from './contract-purchase.component';

@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [
    ContractPurchaseComponent
  ],
})
export class ContractPurchaseModule { }