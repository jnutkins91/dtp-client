import { NgModule } from '@angular/core';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { MarketplaceComponent } from './marketplace.component';
import { MarketplaceDetailComponent } from './marketplace-detail/marketplace-detail.component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule
  ],
  declarations: [
    MarketplaceComponent,
    MarketplaceDetailComponent
  ],
})
export class MarketplaceModule { }