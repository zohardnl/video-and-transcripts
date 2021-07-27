import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MeetingViewComponent} from './meeting-view/meeting-view.component';
import {MeetingsRoutingModule} from "./meetings-routing.module";
import {MeetingsComponent} from './meetings.component';
import {FlexModule} from "@angular/flex-layout";
import {HttpClientModule} from "@angular/common/http";
import {MeetingService} from "../../core/services/meeting.service";
import { TranscriptComponent } from './transcript/transcript.component';


@NgModule({
  declarations: [
    MeetingViewComponent,
    MeetingsComponent,
    TranscriptComponent
  ],
  imports: [
    CommonModule,
    MeetingsRoutingModule,
    FlexModule,
    HttpClientModule
  ],
  exports: [MeetingsComponent],
  providers: [MeetingService]
})
export class MeetingsModule {
}
