import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MeetingViewComponent} from './meeting-view/meeting-view.component';
import {MeetingsRoutingModule} from "./meetings-routing.module";
import {MeetingsComponent} from './meetings.component';
import {FlexModule} from "@angular/flex-layout";
import {HttpClientModule} from "@angular/common/http";
import {MeetingService} from "../../core/services/meeting.service";


@NgModule({
  declarations: [
    MeetingViewComponent,
    MeetingsComponent
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
