import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Transcript} from "../meetings.model";

@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranscriptComponent {
  @Input() transcript: Transcript;

  constructor() {
  }
}
