import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {FrontComponent} from './pages/front/front.component';
import {FrontIndexComponent} from './pages/front/index/index.component';
import {AdminComponent} from './pages/admin/admin.component';
import {AdminLoginComponent} from './pages/admin/login/login.component';
import {AdminIndexComponent} from './pages/admin/index/index.component';

/*const routes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'index', component: FrontIndexComponent}
];*/

const appAdminRoutes: Routes = [
  {path: 'index', component: AdminIndexComponent},
  {path: 'login', component: AdminLoginComponent},
  {
    path: '**', redirectTo: 'index'
  }
];

const appFrontRoutes: Routes = [
  {path: 'index', component: FrontIndexComponent},
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
