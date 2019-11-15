import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ContractEditComponent } from './contract-edit.component';

import { TagInputModule } from 'ngx-chips';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!

@NgModule({
  imports: [
    ThemeModule,
    TagInputModule
    //BrowserAnimationsModule
  ],
  declarations: [
    ContractEditComponent
  ],
})
export class ContractEditModule { }