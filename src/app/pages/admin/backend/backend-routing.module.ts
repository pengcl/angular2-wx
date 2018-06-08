import {Routes} from '@angular/router';
import {AdminBackendIndexComponent} from './index/index.component';
import {AdminBackendIconsComponent} from './icons/icons.component';
import {AdminBackendStatisticsComponent} from './statistics/statistics.component';
import {AdminBackendResumeListTwbComponent} from './resume/list/twb/twb.component';
import {AdminBackendResumeListTysComponent} from './resume/list/tys/tys.component';
import {AdminBackendResumeItemTwbComponent} from './resume/item/twb/twb.component';
import {AdminBackendResumeItemTysComponent} from './resume/item/tys/tys.component';
import {AdminBackendResumeCheckComponent} from './resume/check/check.component';
import {AdminBackendResumeTurnComponent} from './resume/turn/turn.component';

import {AdminBackendTraineeListComponent} from './trainee/list/list.component';
import {AdminBackendTraineeItemComponent} from './trainee/item/item.component';
import {AdminBackendTraineeScoreComponent} from './trainee/score/score.component';
import {AdminBackendTraineeVerifyListComponent} from './trainee/verify/list/list.component';
import {AdminBackendTraineeVerifyItemComponent} from './trainee/verify/item/item.component';
import {AdminBackendTraineeVerifyTurnComponent} from './trainee/verify/turn/turn.component';

import {AdminBackendTermListComponent} from './term/list/list.component';
import {AdminBackendTermItemComponent} from './term/item/item.component';
import {AdminBackendTermAddComponent} from './term/add/add.component';
import {AdminBackendTermEditComponent} from './term/edit/edit.component';

import {AdminBackendHousekeeperListComponent} from './housekeeper/list/list.component';
import {AdminBackendHousekeeperItemComponent} from './housekeeper/item/item.component';
import {AdminBackendHousekeeperSignListComponent} from './housekeeper/sign/list/list.component';
import {AdminBackendHousekeeperSignItemComponent} from './housekeeper/sign/item/item.component';

import {AdminBackendOrderListComponent} from './order/list/list.component';
import {AdminBackendOrderItemComponent} from './order/item/item.component';

import {AdminBackendHousekeeperLeaveListComponent} from './housekeeper/leave/list/list.component';
import {AdminBackendHousekeeperLeaveItemComponent} from './housekeeper/leave/item/item.component';

import {AdminBackendHousekeeperWeekListComponent} from './housekeeper/week/list/list.component';
import {AdminBackendHousekeeperWeekItemComponent} from './housekeeper/week/item/item.component';
import {AdminBackendHousekeeperWeekAuditComponent} from './housekeeper/week/audit/audit.component';

export const appAdminBackendRoutes: Routes = [
  {path: 'index', component: AdminBackendIndexComponent},
  {path: 'icons', component: AdminBackendIconsComponent},
  {path: 'statistics', component: AdminBackendStatisticsComponent},
  {path: 'resume/list/twb', component: AdminBackendResumeListTwbComponent},
  {path: 'resume/list/tys', component: AdminBackendResumeListTysComponent},
  {path: 'resume/item/twb/:id', component: AdminBackendResumeItemTwbComponent},
  {path: 'resume/item/tys/:id', component: AdminBackendResumeItemTysComponent},
  {path: 'resume/check/:id', component: AdminBackendResumeCheckComponent},
  {path: 'resume/turn/:id', component: AdminBackendResumeTurnComponent},

  {path: 'trainee/list', component: AdminBackendTraineeListComponent},
  {path: 'trainee/item/:id', component: AdminBackendTraineeItemComponent},
  {path: 'trainee/score/:id', component: AdminBackendTraineeScoreComponent},
  {path: 'trainee/verify/list', component: AdminBackendTraineeVerifyListComponent},
  {path: 'trainee/verify/item/:id', component: AdminBackendTraineeVerifyItemComponent},
  {path: 'trainee/verify/turn/:id', component: AdminBackendTraineeVerifyTurnComponent},

  {path: 'term/list', component: AdminBackendTermListComponent},
  {path: 'term/item/:id', component: AdminBackendTermItemComponent},
  {path: 'term/edit/:id', component: AdminBackendTermEditComponent},
  {path: 'term/add', component: AdminBackendTermAddComponent},

  {path: 'housekeeper/list', component: AdminBackendHousekeeperListComponent},
  {path: 'housekeeper/item/:id', component: AdminBackendHousekeeperItemComponent},
  {path: 'housekeeper/sign/list', component: AdminBackendHousekeeperSignListComponent},
  {path: 'housekeeper/sign/item/:id', component: AdminBackendHousekeeperSignItemComponent},
  {path: 'housekeeper/leave/list', component: AdminBackendHousekeeperLeaveListComponent},
  {path: 'housekeeper/leave/item/:id', component: AdminBackendHousekeeperLeaveItemComponent},
  {path: 'housekeeper/week/list', component: AdminBackendHousekeeperWeekListComponent},
  {path: 'housekeeper/week/item/:id', component: AdminBackendHousekeeperWeekItemComponent},
  {path: 'housekeeper/week/audit/:id', component: AdminBackendHousekeeperWeekAuditComponent},

  {path: 'order/list', component: AdminBackendOrderListComponent},
  {path: 'order/item/:id', component: AdminBackendOrderItemComponent},
  {
    path: '**', redirectTo: 'index'
  }
];
