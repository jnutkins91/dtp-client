import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NewThreadDialogComponent } from './pages/forum/thread/newThread-dialog.component';
import { ShowcaseDialogComponent } from './pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NewCommentDialogComponent } from './pages/forum/comment/newComment-dialog.component';
import { NewContractCommentDialogComponent } from './pages/contract-detail/newContractComment-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NewThreadDialogComponent,
    ShowcaseDialogComponent,
    NewCommentDialogComponent,
    NewContractCommentDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot()
  ],
  entryComponents: [
    NewThreadDialogComponent,
    ShowcaseDialogComponent,
    NewContractCommentDialogComponent,
    NewCommentDialogComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
