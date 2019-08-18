import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ContractCreateComponent } from './contract-create.component';

@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [
    ContractCreateComponent
  ],
})
export class ContractCreateModule { }