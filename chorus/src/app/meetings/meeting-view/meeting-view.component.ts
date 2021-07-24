import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input, NgZone, Renderer2,
  ViewChild
} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Transcript} from "../meetings.model";
import {MeetingService} from "../../../core/services/meeting.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {fromEvent} from "rxjs";
import {tap} from "rxjs/operators";

@UntilDestroy()
@Component({
  selector: 'app-meeting-view',
  templateUrl: './meeting-view.component.html',
  styleUrls: ['./meeting-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingViewComponent implements AfterViewInit {
  @ViewChild('videoMeeting') videoMeeting: ElementRef<HTMLVideoElement>;
  @ViewChild('meetingView') meetingView: ElementRef<HTMLElement>;

  @Input() set meetingId(val: string) {
    if (val) {
      this._meetingId = val;
      this.meetingUrl = `${environment.baseUrl}${this._meetingId}.mp4`;
    }
  }

  @Input() set transcriptData(data: Transcript[]) {
    if (data) {
      this._transcriptData = data;

      this.mappedTranscript = data.reduce((prev: { [key: number]: Transcript }, current: Transcript) => {
        const time: number = +current.time.toFixed(0);
        prev[time] = {
          ...current,
          time
        };

        return prev;
      }, {});

      this.cdr.markForCheck();
    }
  }

  meetingUrl: string;
  _meetingId: string;
  _transcriptData: Transcript[];
  videoIsValid: boolean = true;
  videoCurrentTime: number = 0;
  mappedTranscript: { [key: number]: Transcript };

  constructor(private meetingService: MeetingService, private cdr: ChangeDetectorRef,
              private renderer: Renderer2, private zone: NgZone
  ) {
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      fromEvent(this.videoMeeting.nativeElement, 'timeupdate').pipe(
        tap(() => this.addTranscript()),
        untilDestroyed(this)
      ).subscribe();
    });
  }

  addTranscript() {
    this.videoCurrentTime = +this.videoMeeting.nativeElement.currentTime.toFixed(0);
    const currentTranscript: Transcript = this.mappedTranscript[this.videoCurrentTime];

    if (this.videoCurrentTime === currentTranscript?.time) {
      const speakerName: string = currentTranscript.speaker.toLowerCase();

      const container: HTMLElement = this.renderer.createElement('div');
      const speakerArea: HTMLElement = this.renderer.createElement('div');
      const speaker: HTMLElement = this.renderer.createElement('span');
      const text: HTMLElement = this.renderer.createElement('span');
      const color: HTMLElement = this.renderer.createElement('div');

      container.classList.add('container', `${speakerName}-container`)
      this.renderer.addClass(speakerArea, 'speaker-area');
      this.renderer.addClass(color, speakerName);
      this.renderer.addClass(speaker, `${speakerName}-speaker`);
      this.renderer.addClass(text, `${speakerName}-text`);
      speaker.innerText = currentTranscript.speaker;
      text.innerText = currentTranscript.snippet;


      speakerArea.appendChild(speaker);
      speakerArea.appendChild(text);
      container.appendChild(color);
      container.appendChild(speakerArea);

      this.renderer.appendChild(this.meetingView.nativeElement, container);
    }
  }

  onVideoHasError(event: ErrorEvent) {
    this.videoIsValid = false;
    alert(event.message);
  }
}
