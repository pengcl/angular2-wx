import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {FrontComponent} from './pages/front/front.component';
import {FrontIndexComponent} from './pages/front/index/index.component';
import {FrontRedComponent} from './pages/front/red/red.component';
import {FrontRedGetComponent} from './pages/front/red/get/get.component';
import {AdminComponent} from './pages/admin/admin.component';
import {AdminLoginComponent} from './pages/admin/login/login.component';
import {AdminIndexComponent} from './pages/admin/index/index.component';
import {AdminProfileComponent} from './pages/admin/profile/profile.component';
import {AdminClockInComponent} from './pages/admin/clockIn/clockIn.component';
import {AdminListsComponent} from './pages/admin/lists/lists.component';
import {AdminFormComponent} from './pages/admin/form/form.component';
import {AdminFormLeaveComponent} from './pages/admin/form/leave/leave.component';
import {AdminFormAgreementComponent} from './pages/admin/form/agreement/agreement.component';
import {AdminOrderComponent} from './pages/admin/order/order.component';
import {AdminOrderListComponent} from './pages/admin/order/list/list.component';
import {AdminOrderDetailsComponent} from './pages/admin/order/details/details.component';

const appFrontRedRoutes: Routes = [
  {path: 'get', component: FrontRedGetComponent},
  {
    path: '**', redirectTo: 'get'
  }
];

const appAdminFormRoutes: Routes = [
  {path: 'leave', component: AdminFormLeaveComponent},
  {path: 'agreement', component: AdminFormAgreementComponent},
  {
    path: '**', redirectTo: 'leave'
  }
];

const appAdminOrderRoutes: Routes = [
  {path: 'list', component: AdminOrderListComponent},
  {path: 'details', component: AdminOrderDetailsComponent},
  {
    path: '**', redirectTo: 'leave'
  }
];

const appAdminRoutes: Routes = [
  {path: 'index', component: AdminIndexComponent},
  {path: 'login', component: AdminLoginComponent},
  {path: 'profile', component: AdminProfileComponent},
  {path: 'clockIn', component: AdminClockInComponent},
  {path: 'lists', component: AdminListsComponent},
  {
    path: 'form',
    component: AdminFormComponent,
    children: appAdminFormRoutes
  },
  {
    path: 'order',
    component: AdminOrderComponent,
    children: appAdminOrderRoutes
  },
  {
    path: '**', redirectTo: 'index'
  }
];

const appFrontRoutes: Routes = [
  {path: 'index', component: FrontIndexComponent},
  {
    path: 'red',
    component: FrontRedComponent,
    children: appFrontRedRoutes
  },
  {
    path: '**', redirectTo: 'index'
  }
];

export const routes: Routes = [

  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {
    path: 'front',
    component: FrontComponent,
    children: appFrontRoutes
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: appAdminRoutes
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
