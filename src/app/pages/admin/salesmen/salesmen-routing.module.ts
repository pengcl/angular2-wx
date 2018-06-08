import {Routes} from '@angular/router';

import {AdminSalesmenHomeComponent} from './home/home.component';
import {AdminSalesmenCustomerComponent} from './customer/customer.component';
import {AdminSalesmenChannelComponent} from './channel/channel.component';

import {AdminSalesmenOrderListComponent} from './order/list/list.component';

import {AdminSalesmenAccountIncomeComponent} from './account/income/income.component';
import {AdminSalesmenAccountBankAddComponent} from './account/bank/add/add.component';
import {AdminSalesmenAccountBankEditComponent} from './account/bank/edit/edit.component';
import {AdminSalesmenAccountWithdrawComponent} from './account/withdraw/withdraw.component';
import {AdminSalesmenAccountWithdrawAboutComponent} from './account/withdraw/about/about.component';

import {AdminSalesmenStatisticsComponent} from './statistics/statistics.component';
import {AdminSalesmenInviteComponent} from './invite/invite.component';

import {AdminSalesmenSuccessComponent} from './success/success.component';


import {AdminSalesmenQrComponent} from './qr/qr.component';

export const appAdminSalesmenRoutes: Routes = [
  {path: 'home', component: AdminSalesmenHomeComponent},
  {path: 'customer', component: AdminSalesmenCustomerComponent},
  {path: 'channel', component: AdminSalesmenChannelComponent},
  {path: 'account/income', component: AdminSalesmenAccountIncomeComponent},
  {path: 'account/bank/add', component: AdminSalesmenAccountBankAddComponent},
  {path: 'account/bank/edit', component: AdminSalesmenAccountBankEditComponent},
  {path: 'account/withdraw', component: AdminSalesmenAccountWithdrawComponent},
  {path: 'account/withdraw/about', component: AdminSalesmenAccountWithdrawAboutComponent},

  {path: 'statistics/:id', component: AdminSalesmenStatisticsComponent},
  {path: 'invite', component: AdminSalesmenInviteComponent},
  {path: 'order/list', component: AdminSalesmenOrderListComponent},
  {path: 'qr', component: AdminSalesmenQrComponent},
  {path: 'success', component: AdminSalesmenSuccessComponent},
  {
    path: '**', redirectTo: 'home'
  }
];
