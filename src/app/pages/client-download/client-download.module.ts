import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ClientDownloadComponent } from './client-download.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    ClientDownloadComponent,
  ],
})
export class ClientDownloadModule { }
