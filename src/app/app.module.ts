import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { MeetingListComponent } from './meetings/meeting-list/meeting-list.component';
import { MeetingAddComponent } from './meetings/meeting-add-update/meeting-add-update.component';
import { ApiService } from './service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MeetingListComponent,
    MeetingAddComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    DateTimePickerModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
