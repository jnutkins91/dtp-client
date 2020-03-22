import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';
import { package_builer_message } from '../../@core/data/package_builder_message';
import { DataTransferService } from '../../@core/services/data-transfer.service';

@Component({
  selector: 'speed-test',
  styleUrls: ['./speed-test.component.scss'],
  templateUrl: './speed-test.component.html',
})
export class SpeedTestComponent implements OnInit {

  constructor(private dataTransferService: DataTransferService) {

  }

  sub: any;
  messages: any;

  losAngelesMessage: package_builer_message;
  newYorkMessage: package_builer_message;
  londonMessage: package_builer_message;
  kyivMessage: package_builer_message;
  tokyoMessage: package_builer_message;

  ngOnInit() {

    this.sub = Observable.interval(3000)
      .subscribe((val) => { this.getResults(); });
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

  sendData() {

    this.dataTransferService.sendTestData()
      .subscribe(

        (data: package_builer_message[]) => {

          console.log("Sent Data!");

        },
        err => console.error('Observer got an error: ' + err),
        () => { });
  }
}
