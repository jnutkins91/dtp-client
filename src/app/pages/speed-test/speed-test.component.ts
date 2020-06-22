import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';
import { package_builer_message } from '../../@core/data/package_builder_message';
import { DataTransferService } from '../../@core/services/data-transfer.service';
import { NbToastrService  } from '@nebular/theme';

@Component({
  selector: 'speed-test',
  styleUrls: ['./speed-test.component.scss'],
  templateUrl: './speed-test.component.html',
})
export class SpeedTestComponent implements OnInit {

  constructor(private dataTransferService: DataTransferService,
    private toastrService: NbToastrService) {

  }

  sub: any;
  messages: any;

  dataLastSent: string;

  losAngelesMessage: package_builer_message;
  newYorkMessage: package_builer_message;
  londonMessage: package_builer_message;
  kyivMessage: package_builer_message;
  tokyoMessage: package_builer_message;

  ngOnInit() {

    this.dataLastSent = 'N/A';

    // this.getResults();

    // this.sub = Observable.interval(3000)
    //   .subscribe((val) => { this.getResults(); });
  }

  getResults() {

    this.dataTransferService.getTestData()
      .subscribe(

        (data: package_builer_message[]) => {

          this.messages = data;
          console.log(this.messages);

          for (let entry of this.messages) {

            if (entry.contract_id === 1)
              this.losAngelesMessage = entry;
            else if (entry.contract_id === 2)
              this.newYorkMessage = entry;
            else if (entry.contract_id === 3)
              this.londonMessage = entry;
            else if (entry.contract_id === 4)
              this.kyivMessage = entry;
            else if (entry.contract_id === 5)
              this.tokyoMessage = entry;

          }

        },
        err => console.error('Observer got an error: ' + err),
        () => { });
  }

  showToast(position, status, text) {
    this.toastrService.show(
      status || 'Success',
      text,
      { position, status });
  }

  sendData() {

    this.showToast('top-right', 'info', 'Sending Data...');

    this.dataTransferService.sendTestData()
      .subscribe(

        (data: package_builer_message[]) => {

          console.log("Sent Data!");

          this.showToast('top-right', 'success', 'Data Sent!');

          this.dataLastSent = "21:44:02";

          this.messages = data;
          console.log(this.messages);

          for (let entry of this.messages) {

            this.dataLastSent = entry.datasent_time_string;

            if (entry.contract_id === 1)
              this.losAngelesMessage = entry;
            else if (entry.contract_id === 2)
              this.newYorkMessage = entry;
            else if (entry.contract_id === 3)
              this.londonMessage = entry;
            else if (entry.contract_id === 4)
              this.kyivMessage = entry;
            else if (entry.contract_id === 5)
              this.tokyoMessage = entry;

          }

        },
        err => {

          console.error('Observer got an error: ' + err);

          this.showToast('top-right', 'danger', 'Failed to Send Data!');

          this.dataLastSent = 'N/A';

        },
        () => { 

        });
  }
}
