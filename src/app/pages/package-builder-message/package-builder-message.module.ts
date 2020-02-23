import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { PackageBuilderMessageComponent } from './package-builder-message.component';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    ThemeModule,
    NgxPaginationModule,
  ],
  declarations: [
    PackageBuilderMessageComponent,
  ],
})
export class PackageBuilderMessageModule { }
