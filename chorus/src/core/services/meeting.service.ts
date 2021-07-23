import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Transcript} from "../../app/meetings/meetings.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {filter, tap} from "rxjs/operators";

@Injectable()
export class MeetingService {
  _transcript: Subject<Transcript[]> = new Subject<Transcript[]>();

  constructor(private http: HttpClient) {
  }

  get transcript(): Observable<Transcript[]> {
    return this._transcript.asObservable();
  }

  getTranscript(id: string): Observable<Transcript[]> {
    return this.http.get<Transcript[]>(`${environment.baseUrl}${id}.json`).pipe(
      filter(data => !!data?.length),
      tap(data => {
        this._transcript.next(data);
      })
    );
  }
}
