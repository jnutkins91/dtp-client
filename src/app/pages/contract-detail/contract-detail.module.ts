import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ContractDetailComponent } from './contract-detail.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    ContractDetailComponent,
  ],
})
export class ContractDetailModule { }
