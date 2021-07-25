import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MeetingsComponent} from "./meetings.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MeetingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingsRoutingModule {
}
