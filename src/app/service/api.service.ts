import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../model/user.model';
import {Observable} from 'rxjs/index';
import {ApiResponse} from '../model/api.response';
import { Meeting } from '../model/meeting.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

constructor(private http: HttpClient) { }
baseUrl: any = environment.apiUrl;

login(loginObject: User): Observable<ApiResponse> {
return this.http.post<ApiResponse>('http://localhost:8071/api/' + 'Login/Authenticate', loginObject);
}

getAttendeeList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + 'GetAttendees');
  }
  getMeetingList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }
  createMeeting(meetingObj: Meeting): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, meetingObj);
  }

  updateMeeting(meetingObj: Meeting): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl, meetingObj);
  }

}
