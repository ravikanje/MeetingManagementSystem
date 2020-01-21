import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meeting-add',
  templateUrl: './meeting-add-update.component.html'
})
export class MeetingAddComponent implements OnInit {
  // variable declarations
  addForm: FormGroup;
  // variable to hold attendee list
  attendeeList: any[];
  // to hold selected meeting record info
  selMeeting: any;
  // check whether record exists already otherwise new record
  isRecordExists: boolean;
  isSelClicked: boolean ;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) {	
  const navigation = this.router.getCurrentNavigation();
  this.selMeeting = navigation.extras.state;
  }
  ngOnInit() {

    this.addForm = this.formBuilder.group({
      MeetingId : [0],
      MeetingSubject: ['', [Validators.required, Validators.maxLength(50)]],
      MeetingAttendees: ['', Validators.required],
      MeetingAgenda: ['', Validators.required],
      MeetingDateTime: ['', Validators.required],
      selAttendees: []
    });

    // Load attendees from web api
    this.apiService.getAttendeeList()
      .subscribe( data => {
        this.attendeeList = data.result;
    });

      // if user selects one of the existing meeting from meeting list screen
      // bind the selected meeting object to form for update
    if (this.selMeeting !== undefined && this.selMeeting !== null) {
        this.isRecordExists = true;
        this.addForm.get('MeetingId').setValue(this.selMeeting.MeetingId);
        this.addForm.get('MeetingSubject').setValue(this.selMeeting.MeetingSubject);
        this.addForm.get('MeetingAttendees').setValue(this.selMeeting.MeetingAttendees);
        this.addForm.get('MeetingAgenda').setValue(this.selMeeting.MeetingAgenda);
        this.addForm.get('MeetingDateTime').setValue(this.selMeeting.MeetingDateTime);
    }
  }

   onSubmit() {
      if (this.addForm.invalid) {
        return;
      }
     // if user selects existing record then update
      if (this.isRecordExists) {
          this.apiService.updateMeeting(this.addForm.value)
          .subscribe( data => {
            if ( data.status === 200 ) { alert( 'Data saved successfully'); }
            this.router.navigate(['meeting-list']);
          });
      } else {  // new record
            this.apiService.createMeeting(this.addForm.value)
            .subscribe( data => {
              if ( data.status === 200 ) { alert( 'Data saved successfully'); }
              this.router.navigate(['meeting-list']);
            });
        }
    }
    // on click of this button navigate user to the meeting list screen
    backToMeetingList() {
      this.router.navigate(['meeting-list']);
    }
    // on click of the Select button assign selected attendees to selected attendees textbox
  setSelAttendees() {
    this.isSelClicked = true;
    if ( this.addForm.get('selAttendees').value !== null) {
        if ( this.addForm.get('selAttendees').value.length > 10) {
          alert('Selecting more than 10 attendees not allowed. ');
          return;
        }
        this.addForm.get('MeetingAttendees').setValue(this.addForm.get('selAttendees').value.join(','));
      } else {
        alert('Please select atleast one attendee');
      }
  }

  // reset the form  on click of reset button
  resetForm()  {
    this.addForm.reset();
  }
}
