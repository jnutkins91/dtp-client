import { Component } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'contact-us',
  styleUrls: ['./contact-us.component.scss'],
  templateUrl: './contact-us.component.html',
})
export class ContactUsComponent {

  constructor(private toastrService: NbToastrService) {
  }

  lat = 51.520020;
  lng = -0.108350;
  zoom = 7;

  contactForm = {

    email: null,
    body: null
  }

  showToast(position, status) {

    console.log(this.contactForm);

    this.toastrService.show(
      '',
      `Thanks!`,
      { position, status });
  }
}
