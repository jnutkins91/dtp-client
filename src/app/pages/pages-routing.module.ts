import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ForumComponent } from './forum/forum.component';
import { ThreadComponent } from './forum/thread/thread.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { CommentComponent } from './forum/comment/comment.component';
import { SearchComponent } from './search/search.component';
import { MarketplaceDetailComponent } from './marketplace/marketplace-detail/marketplace-detail.component';
import { UsersComponent } from './users/users.component';
import { TagsComponent } from './tags/tags.component';
import { HomePageComponent } from './homepage/homepage.component';
import { ContractComponent } from './contract/contract.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContractCreateComponent } from './contract-create/contract-create.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractCurrentUserComponent } from './contract-current-user/contract-current-user.component';
import { ContractPurchaseComponent } from './contract-purchase/contract-purchase.component';
import { FAQComponent } from './faq/faq.component';
import { ContractEditComponent } from './contract-edit/contract-edit.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AdminHomeComponent } from './admin_home/admin_home.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
    path: 'marketplace',
    component: MarketplaceComponent
  },
  {
    path: 'forum',
    component: ForumComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'forum/thread',
    component: ThreadComponent
  },
  {
    path: 'forum/comment',
    component: CommentComponent
  },
  {
    path: 'tags',
    component: TagsComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'contract-create',
    component: ContractCreateComponent
  },
  {
    path: 'contract-edit',
    component: ContractEditComponent
  },
  {
    path: 'contract-purchase',
    component: ContractPurchaseComponent
  },
  {
    path: 'contract-detail',
    component: ContractDetailComponent
  },
  {
    path: 'contract-current-user',
    component: ContractCurrentUserComponent
  },
  {
    path: 'contract',
    component: ContractComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {
    path: 'faq',
    component: FAQComponent
  },
  {
    path: 'admin_home',
    component: AdminHomeComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  },{
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'marketplace/marketplace-detail',
    component: MarketplaceDetailComponent
  },
  {
    path: 'my-account',
    component: MyAccountComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'dashboard',
    component: ECommerceComponent,
  },
  {
    path: 'iot-dashboard',
    component: DashboardComponent,
  },
  {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  },
  {
    path: 'modal-overlays',
    loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',
  },
  {
    path: 'extra-components',
    loadChildren: './extra-components/extra-components.module#ExtraComponentsModule',
  },
  {
    path: 'bootstrap',
    loadChildren: './bootstrap/bootstrap.module#BootstrapModule',
  }, 
  {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule',
  }, 
  {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  }, 
  {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, 
  {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  }, 
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }, 
  {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
