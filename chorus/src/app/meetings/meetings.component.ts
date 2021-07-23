import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {MeetingService} from "../../core/services/meeting.service";
import {filter, switchMap} from "rxjs/operators";
import {Transcript} from "./meetings.model";

@UntilDestroy()
@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingsComponent implements OnInit {
  meetingId: string;
  data: Transcript[];
  meetingTitle:string = 'Moment from meeting with Two Pillars';

  constructor(
    private meetingService: MeetingService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      filter(queryParams => !!queryParams?.id),
      switchMap(queryParams => {
        this.meetingId = queryParams.id;
        return this.meetingService.getTranscript(this.meetingId);
      }),
      untilDestroyed(this)).subscribe();
  }

}
