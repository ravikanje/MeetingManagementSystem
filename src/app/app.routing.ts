import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MeetingListComponent } from './meetings/meeting-list/meeting-list.component';
import { MeetingAddComponent } from './meetings/meeting-add-update/meeting-add-update.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'meeting-list', component: MeetingListComponent },
  { path: 'meeting-add-update', component: MeetingAddComponent },
  { path: '', component: LoginComponent }
];
export const routing = RouterModule.forRoot(routes);

