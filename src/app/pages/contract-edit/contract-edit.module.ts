import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ContractEditComponent } from './contract-edit.component';

import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
    ThemeModule,
    TagInputModule,
  ],
  declarations: [
    ContractEditComponent,
  ],
})
export class ContractEditModule { }
