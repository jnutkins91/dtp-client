import { Component } from '@angular/core';

import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbMenuItem } from '@nebular/theme';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  // template: `
  //   <ngx-sample-layout>
  //     <nb-menu [items]="menu"></nb-menu>
  //     <router-outlet></router-outlet>
  //   </ngx-sample-layout>
  // `,
  template: `
    <ngx-sample-layout>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  user = {};

  MENU_ITEMS: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'nb-home',
      link: '/pages/home',
    },
    {
      title: 'Data',
      icon: 'nb-cloudy',
      children: [
        {
          title: 'Tags',
          icon: 'nb-edit',
          link: '/pages/tags', // goes into angular `routerLink`
        },
        {
          title: 'Users',
          icon: 'nb-person',
          link: '/pages/users', // goes directly into `href` attribute
        },
      ],
    },
    {
      title: 'Forum',
      icon: 'nb-lightbulb',
      link: '/pages/forum',
    },
    {
      title: 'Client Downloads',
      icon: 'nb-e-commerce',
      link: '/pages/client-download',
    },
    {
      title: 'Accounting Log',
      icon: 'nb-notifications',
      link: '/pages/package-builder-message',
    },
    {
      title: 'Speed Test',
      icon: 'nb-shuffle',
      link: '/pages/speed-test',
    },
  ];

  menu = this.MENU_ITEMS;

  constructor(private authService: NbAuthService,
    private _router: Router) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });

    this._router.events.pipe(
      filter(e => e instanceof NavigationStart),
      filter((e: NavigationStart) => e.navigationTrigger === 'popstate'),
    )
      .subscribe((x: NavigationStart) => {
        this._router.getCurrentNavigation().extras.state = { ...x.restoredState, navigationId: x.id };
      });
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }
}
