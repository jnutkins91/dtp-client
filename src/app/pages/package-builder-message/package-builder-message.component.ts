import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../../@core/services/data-transfer.service';

@Component({
  selector: 'package-builder-message',
  styleUrls: ['./package-builder-message.component.scss'],
  templateUrl: './package-builder-message.component.html',
})
export class PackageBuilderMessageComponent implements OnInit {

  collection = [];

  constructor(private dataTransferService: DataTransferService) {

  }

  loading = false;
  messages: any;

  ngOnInit() {

    this.getMessages();
  }

  getMessages() {
    this.loading = true;
    this.dataTransferService.getMessages()
      .subscribe(

        (data: any) => {

          this.messages = data;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
  }

  ping() {
    this.dataTransferService.ping()
      .subscribe(

        (data: any) => { },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
  }
}
