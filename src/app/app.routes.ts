import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { CreaterequestComponent } from './createrequest/createrequest.component';
import { ViewrequestComponent } from './viewrequest/viewrequest.component';
import { RequestDetailsComponent } from './request-details/request-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'create',
    component: CreaterequestComponent,
    canActivate: [authGuard],
  },
  { path: 'view', component: ViewrequestComponent, canActivate: [authGuard] },

  {
    path: 'request-details/:id/:tableType',
    component: RequestDetailsComponent,
    canActivate: [authGuard],
  },
];
