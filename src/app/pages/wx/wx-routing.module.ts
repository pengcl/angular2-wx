import {Routes} from '@angular/router';
import {WxIndexComponent} from './index/index.component';
import {WxHomeComponent} from './home/home.component';
import {WxClearComponent} from './clear/clear.component';

export const appWxRoutes: Routes = [
  {path: 'index', component: WxIndexComponent},
  {path: 'home', component: WxHomeComponent},
  {path: 'clear', component: WxClearComponent},
  {
    path: '**', redirectTo: 'index'
  }
];
