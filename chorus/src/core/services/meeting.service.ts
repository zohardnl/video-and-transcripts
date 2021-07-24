import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Transcript} from "../../app/meetings/meetings.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class MeetingService {
  constructor(private http: HttpClient) {
  }

  getTranscript(id: string): Observable<Transcript[]> {
    return this.http.get<Transcript[]>(`${environment.baseUrl}${id}.json`);
  }
}
