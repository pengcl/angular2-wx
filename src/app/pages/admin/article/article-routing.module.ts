import {Routes} from '@angular/router';
import {AdminArticleListComponent} from './list/list.component';
import {AdminArticleItemComponent} from './item/item.component';
import {AdminArticleItem1Component} from './item/1/1.component';
import {AdminArticleItem2Component} from './item/2/2.component';


export const appAdminArticleRoutes: Routes = [
  {path: 'list', component: AdminArticleListComponent},
  {path: 'item', component: AdminArticleItemComponent},
  {path: 'item/1', component: AdminArticleItem1Component},
  {path: 'item/2', component: AdminArticleItem2Component},
  {
    path: '**', redirectTo: 'list'
  }
];
