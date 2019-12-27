import { Component } from '@angular/core';

//import { MENU_ITEMS } from './pages-menu';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbMenuItem } from '@nebular/theme';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  user = {};

  MENU_ITEMS: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'nb-bar-chart',
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
        }
      ],
    },
    {
      title: 'Groups',
      icon: 'nb-grid-b-outline',
      link: '/pages/faq',
    },
    {
      title: 'Forum',
      icon: 'nb-lightbulb',
      link: '/pages/forum',
    }
    // ,
    // {
    //   title: 'UI',
    //   icon: 'nb-lightbulb',
    //   children: [
    //     {
    //       title: 'Form Inputs',
    //       icon: 'nb-edit',
    //       link: '/pages/forms/inputs', // goes into angular `routerLink`
    //     },
    //     {
    //       title: 'Form Layouts',
    //       icon: 'nb-person',
    //       link: '/pages/forms/layouts', // goes directly into `href` attribute
    //     },
    //     {
    //       title: 'Buttons',
    //       icon: 'nb-person',
    //       link: '/pages/forms/buttons', // goes directly into `href` attribute
    //     },
    //     {
    //       title: 'Datepicker',
    //       icon: 'nb-person',
    //       link: '/pages/forms/datepicker', // goes directly into `href` attribute
    //     }
    //   ],
    // }
  ];

  menu = this.MENU_ITEMS;

  constructor(private authService: NbAuthService,
    private _router: Router) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          console.log("Token:");
          console.log(token.getPayload());
          this.user = token.getPayload(); // here we receive a payload from the token and assign it to our `user` variable 
          console.log("User:");
          console.log(this.user);
        }

      });

      this._router.events.pipe(
        filter(e => e instanceof NavigationStart),
        filter((e: NavigationStart) => e.navigationTrigger == "popstate")
      )
        .subscribe((x: NavigationStart) => {
          //this.itemId = history.state.itemId;
          this._router.getCurrentNavigation().extras.state={...x.restoredState, navigationId:x.id } ;
        });
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }
}
