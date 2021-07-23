import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Transcript} from "../meetings.model";
import {MeetingService} from "../../../core/services/meeting.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {tap} from "rxjs/operators";

@UntilDestroy()
@Component({
  selector: 'app-meeting-view',
  templateUrl: './meeting-view.component.html',
  styleUrls: ['./meeting-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingViewComponent implements OnInit {
  @Input() set id(val: string) {
    if (val) {
      this._id = val;
      this.meetingUrl = `${environment.baseUrl}${this._id}.mp4`;
    }
  }

  meetingUrl: string;
  _id: string;
  _transcript: Transcript[];

  constructor(private meetingService: MeetingService,private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.registerMeetingData();
  }

  registerMeetingData() {
    this.meetingService.transcript.pipe(
      tap(data => {
        this._transcript = data;
        this.cdr.markForCheck();
      }),
      untilDestroyed(this)
    ).subscribe();
  }
}
