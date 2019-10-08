import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ContractCreateComponent } from './contract-create.component';

import { TagInputModule } from 'ngx-chips';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!

@NgModule({
  imports: [
    ThemeModule,
    TagInputModule
    //BrowserAnimationsModule
  ],
  declarations: [
    ContractCreateComponent
  ],
})
export class ContractCreateModule { }