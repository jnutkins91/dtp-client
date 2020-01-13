import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ContractCreateComponent } from './contract-create.component';

import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
    ThemeModule,
    TagInputModule,
  ],
  declarations: [
    ContractCreateComponent,
  ],
})
export class ContractCreateModule { }
