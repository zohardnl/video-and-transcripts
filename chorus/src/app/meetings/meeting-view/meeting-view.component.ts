import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input, OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Transcript} from "../meetings.model";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {BehaviorSubject, fromEvent, Observable} from "rxjs";
import {tap} from "rxjs/operators";

@UntilDestroy()
@Component({
  selector: 'app-meeting-view',
  templateUrl: './meeting-view.component.html',
  styleUrls: ['./meeting-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingViewComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('videoMeeting') videoMeeting: ElementRef<HTMLVideoElement>;
  @ViewChild('meetingView') meetingView: ElementRef<HTMLElement>;

  @Input() meetingId: string;
  @Input() transcriptData: Transcript[];

  meetingUrl: string;
  videoIsValid: boolean = true;
  videoCurrentTime: number = 0;
  mappedTranscript: { [key: number]: Transcript };
  currentText: string = '';

  private _activeTranscripts$: BehaviorSubject<Transcript[]> = new BehaviorSubject<Transcript[]>([]);
  activeTranscripts$: Observable<Transcript[]> = this._activeTranscripts$.asObservable();

  constructor() {
  }

  ngOnInit() {
    this.meetingUrl = `${environment.baseUrl}${this.meetingId}.mp4`;
    this.mappedTranscript = this.transcriptData.reduce((prev: { [key: number]: Transcript }, current: Transcript) => {
      const time: number = +current.time.toFixed(0);
      prev[time] = {
        ...current,
        time
      };

      return prev;
    }, {});
  }

  ngAfterViewInit() {
    fromEvent(this.videoMeeting.nativeElement, 'timeupdate').pipe(
      tap(() => this.addTranscript()),
      untilDestroyed(this)
    ).subscribe();
  }

  addTranscript() {
    this.videoCurrentTime = +this.videoMeeting.nativeElement.currentTime.toFixed(0);
    const currentTranscript: Transcript = this.mappedTranscript[this.videoCurrentTime];

    if (this.videoCurrentTime === currentTranscript?.time && this.currentText !== currentTranscript?.snippet) {
      this.currentText = currentTranscript.snippet;
      this._activeTranscripts$.next([...this._activeTranscripts$.value, currentTranscript]);
    }
  }

  onVideoHasError(event: ErrorEvent) {
    this.videoIsValid = false;
    alert(event.message);
  }

  ngOnDestroy() {
    this._activeTranscripts$.complete();
  }
}
