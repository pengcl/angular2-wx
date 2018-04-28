import {Routes} from '@angular/router';
import {AdminBackendIndexComponent} from './index/index.component';
import {AdminBackendIconsComponent} from './icons/icons.component';
import {AdminBackendTraineeListComponent} from './trainee/list/list.component';

export const appAdminBackendRoutes: Routes = [
  {path: 'index', component: AdminBackendIndexComponent},
  {path: 'icons', component: AdminBackendIconsComponent},
  {path: 'trainee/list', component: AdminBackendTraineeListComponent},
  {
    path: '**', redirectTo: 'index'
  }
];
