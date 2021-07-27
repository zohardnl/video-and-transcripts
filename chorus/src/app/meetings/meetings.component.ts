import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {MeetingService} from "../../core/services/meeting.service";
import {catchError, filter, switchMap, tap} from "rxjs/operators";
import {Transcript} from "./meetings.model";

@UntilDestroy()
@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingsComponent implements OnInit {
  meetingId: string = '';
  transcriptData: Transcript[] = [];
  meetingTitle: string = 'Moment from meeting with Two Pillars';

  constructor(
    private meetingService: MeetingService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      filter(queryParams => !!queryParams?.id),
      switchMap(queryParams => {
        this.meetingId = queryParams.id;
        return this.meetingService.getTranscript(this.meetingId);
      }),
      tap(data => {
        this.transcriptData = data;
        this.cdr.markForCheck();
      }),
      catchError(err => {
        throw err;
      }),
      untilDestroyed(this)).subscribe();
  }
}
