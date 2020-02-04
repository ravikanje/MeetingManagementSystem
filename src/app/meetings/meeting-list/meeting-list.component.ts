import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api.service';
import { Meeting } from 'src/app/model/meeting.model';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html'
})
export class MeetingListComponent implements OnInit {
  meetingList: Meeting[];
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
     this.getMeetingList();
  }
  // on click of add meeting button navgigate user to add-update meeting screen
  addMeeting(): void {
    this.router.navigate(['meeting-add-update']);
  }
  // on click of update button on meeting list table navigate user to add-update  screen
  updateMeeting(meeting): void {
    // introduced NavigationExtras in angular 7.x version to pass comple object through routes
  const navigationExtras: NavigationExtras = {state: meeting};
      // tslint:disable-next-line:align
      this.router.navigate(['meeting-add-update'], navigationExtras);
  }
  // on click of delete button remove meeting details from db.
  deleteMeeting(meetingId: number): void {
      this.apiService.deleteMeeting(meetingId)
      .subscribe( data => {
        if ( data.status === 200 ) {
          alert( 'Meeting delete successfully');
          this.getMeetingList();
        }
      });
  }
  getMeetingList(): void {
    this.apiService.getMeetingList()
    .subscribe( data => {
      this.meetingList = data.result;
    });
  }
}
