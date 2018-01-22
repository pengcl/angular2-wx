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
import {AdminDetailsComponent} from './pages/admin/details/details.component';
import {AdminMessageComponent} from './pages/admin/message/message.component';
import {AdminDashboardComponent} from './pages/admin/dashboard/dashboard.component';
import {AdminFormComponent} from './pages/admin/form/form.component';
import {AdminFormLeaveComponent} from './pages/admin/form/leave/leave.component';
import {AdminFormAgreementComponent} from './pages/admin/form/agreement/agreement.component';
import {AdminFormEventComponent} from './pages/admin/form/event/event.component';
import {AdminOrderComponent} from './pages/admin/order/order.component';
import {AdminOrderListComponent} from './pages/admin/order/list/list.component';
import {AdminOrderDetailsComponent} from './pages/admin/order/details/details.component';
import {AdminADMComponent} from './pages/admin/adm/adm.component';
import {AdminSettingComponent} from './pages/admin/setting/setting.component';
import {AdminUploaderAvatarComponent} from './pages/admin/uploader/avatar/avatar.component';
import {AdminUploaderGalleryComponent} from './pages/admin/uploader/gallery/gallery.component';

import {AppPayComponent} from './pages/pay/pay.component';

const appFrontRedRoutes: Routes = [
  {path: 'get', component: FrontRedGetComponent},
  {
    path: '**', redirectTo: 'get'
  }
];

const appAdminFormRoutes: Routes = [
  {path: 'leave', component: AdminFormLeaveComponent, data: {state: 'leave'}},
  {path: 'agreement', component: AdminFormAgreementComponent, data: {state: 'agreement'}},
  {path: 'event/:eventTypeId', component: AdminFormEventComponent, data: {state: 'event'}},
  {
    path: '**', redirectTo: 'leave'
  }
];

const appAdminOrderRoutes: Routes = [
  {path: 'list', component: AdminOrderListComponent, data: {state: 'orderList'}},
  {path: 'details', component: AdminOrderDetailsComponent, data: {state: 'orderDetails'}},
  {
    path: '**', redirectTo: 'leave'
  }
];

const appAdminRoutes: Routes = [
  {path: 'index', component: AdminIndexComponent, data: {state: 'index'}},
  {path: 'login', component: AdminLoginComponent, data: {state: 'login'}},
  {path: 'profile/:id', component: AdminProfileComponent, data: {state: 'profile'}},
  {path: 'clockIn', component: AdminClockInComponent, data: {state: 'clockIn'}},
  {path: 'lists', component: AdminListsComponent, data: {state: 'lists'}},
  {path: 'details/:id', component: AdminDetailsComponent, data: {state: 'details'}},
  {path: 'message', component: AdminMessageComponent, data: {state: 'message'}},
  {path: 'dashboard', component: AdminDashboardComponent, data: {state: 'dashboard'}},
  {path: 'ADM', component: AdminADMComponent, data: {state: 'ADM'}},
  {path: 'setting', component: AdminSettingComponent, data: {state: 'setting'}},
  {path: 'uploader/avatar', component: AdminUploaderAvatarComponent, data: {state: 'avatar'}},
  {path: 'uploader/gallery', component: AdminUploaderGalleryComponent, data: {state: 'gallery'}},
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
  {path: 'pay', component: AppPayComponent, data: {state: 'pay'}},
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
