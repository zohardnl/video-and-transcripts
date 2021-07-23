import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-meeting-view',
  templateUrl: './meeting-view.component.html',
  styleUrls: ['./meeting-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingViewComponent implements OnInit {
  @Input() id: string;
  meetingUrl: string;

  constructor() {
  }

  ngOnInit(): void {
    this.meetingUrl = `${environment.baseUrl}${this.id}.mp4`;
  }

}
