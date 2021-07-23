import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MeetingViewComponent} from './meeting-view/meeting-view.component';
import {MeetingsRoutingModule} from "./meetings-routing.module";
import { MeetingsComponent } from './meetings.component';
import {FlexModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    MeetingViewComponent,
    MeetingsComponent
  ],
  imports: [
    CommonModule,
    MeetingsRoutingModule,
    FlexModule
  ],
  exports: [MeetingsComponent]
})
export class MeetingsModule {
}
