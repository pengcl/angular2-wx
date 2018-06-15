import {Routes} from '@angular/router';
import {AdminArticleListComponent} from './list/list.component';
import {AdminArticleItemComponent} from './item/item.component';
import {AdminArticleItem1Component} from './item/1/1.component';
import {AdminArticleItem2Component} from './item/2/2.component';
import {AdminArticleItem3Component} from './item/3/3.component';
import {AdminArticleItem4Component} from './item/4/4.component';
import {AdminArticleItem5Component} from './item/5/5.component';


export const appAdminArticleRoutes: Routes = [
  {path: 'list', component: AdminArticleListComponent},
  {path: 'item', component: AdminArticleItemComponent},
  {path: 'item/1', component: AdminArticleItem1Component},
  {path: 'item/2', component: AdminArticleItem2Component},
  {path: 'item/3', component: AdminArticleItem3Component},
  {path: 'item/4', component: AdminArticleItem4Component},
  {path: 'item/5', component: AdminArticleItem5Component},
  {
    path: '**', redirectTo: 'list'
  }
];
