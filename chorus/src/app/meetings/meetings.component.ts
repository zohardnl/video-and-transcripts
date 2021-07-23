import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {MeetingService} from "../../core/services/meeting.service";
import {filter, tap} from "rxjs/operators";

@UntilDestroy()
@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MeetingService]
})
export class MeetingsComponent implements OnInit {
  meetingId: string;

  constructor(
    private meetingService: MeetingService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      filter(queryParams => !!queryParams?.id),
      tap(queryParams => this.meetingId = queryParams.id),
      untilDestroyed(this)).subscribe();
  }

}
