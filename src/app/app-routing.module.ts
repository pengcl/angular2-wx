import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {FrontComponent} from './pages/front/front.component';
import {FrontIndexComponent} from './pages/front/index/index.component';
import {FrontEmployeesComponent} from './pages/front/employees/employees.component';
import {FrontEmployeesEmployeeComponent} from './pages/front/employees/employee/employee.component';
import {FrontEmployeesEmployeeRatesComponent} from './pages/front/employees/employee/rates/rates.component';
import {FrontEmployeesEmployeeReserveComponent} from './pages/front/employees/employee/reserve/reserve.component';

import {FrontRedComponent} from './pages/front/red/red.component';
import {FrontRedGetComponent} from './pages/front/red/get/get.component';
import {FrontResumePostComponent} from './pages/front/resume/post/post.component';
import {FrontResumeJobComponent} from './pages/front/resume/job/job.component';
import {FrontGuideComponent} from './pages/front/guide/guide.component';
import {FrontGuideStep1Component} from './pages/front/guide/step-1/step-1.component';
import {FrontGuideStep1CustomComponent} from './pages/front/guide/step-1/step-1-custom/step-1-custom.component';
import {FrontGuideStep2Component} from './pages/front/guide/step-2/step-2.component';
import {FrontGuideStep3Component} from './pages/front/guide/step-3/step-3.component';
import {FrontGuideStep4Component} from './pages/front/guide/step-4/step-4.component';
import {FrontInvestigateComponent} from './pages/front/investigate/investigate.component';
import {FrontInvestigateWishComponent} from './pages/front/investigate/wish/wish.component';
import {FrontInvestigateSuccessComponent} from './pages/front/investigate/success/success.component';
import {FrontMsgSuccessComponent} from './pages/front/msg/success/success.component';

import {AdminComponent} from './pages/admin/admin.component';
import {AdminLoginComponent} from './pages/admin/login/login.component';
import {AdminRegisterRecruiterComponent} from './pages/admin/register/recruiter/recruiter.component';
import {AdminIndexComponent} from './pages/admin/index/index.component';

import {AdminEmployerComponent} from './pages/admin/employer/employer.component';
import {AdminEmployerEmployeesComponent} from './pages/admin/employer/employees/employees.component';
import {AdminEmployerEmployeesEmployeeComponent} from './pages/admin/employer/employees/employee/employee.component';
import {AdminEmployerEmployeesEmployeeProfileComponent} from './pages/admin/employer/employees/employee/profile/profile.component';
import {AdminEmployerEmployeesEmployeeExchangeComponent} from './pages/admin/employer/employees/employee/exchange/exchange.component';
import {AdminEmployerEmployeesEmployeeAttendanceComponent} from './pages/admin/employer/employees/employee/attendance/attendance.component';
import {AdminEmployerEmployeesEmployeeAttendanceEmployeesComponent} from './pages/admin/employer/employees/employee/attendance/employees/employees.component';
import {AdminEmployerApprovalsLeavesComponent} from './pages/admin/employer/approvals/leaves/leaves.component';
import {AdminEmployerApprovalsLeavesLeaveComponent} from './pages/admin/employer/approvals/leaves/leave/leave.component';
import {AdminEmployerOrderListComponent} from './pages/admin/employer/order/list/list.component';
import {AdminEmployerOrderDetailsComponent} from './pages/admin/employer/order/details/details.component';
import {AdminEmployerOrderProtocolsComponent} from './pages/admin/employer/order/protocols/protocols.component';
import {AdminEmployerRateListComponent} from './pages/admin/employer/rate/list/list.component';
import {AdminEmployerRateAddComponent} from './pages/admin/employer/rate/add/add.component';
import {AdminEmployerRateDetailsComponent} from './pages/admin/employer/rate/details/details.component';
import {AdminEmployerMessageComponent} from './pages/admin/employer/message/message.component';
import {AdminEmployerFeedbackComponent} from './pages/admin/employer/feedback/feedback.component';
import {AdminEmployerRecruitmentComponent} from './pages/admin/employer/recruitment/recruitment.component';
import {AdminEmployerRecruitmentRecordsComponent} from './pages/admin/employer/recruitment/records/records.component';

import {AdminEmployeeComponent} from './pages/admin/employee/employee.component';
import {AdminEmployeeProfileComponent} from './pages/admin/employee/profile/profile.component';
import {AdminEmployeeSettingComponent} from './pages/admin/employee/setting/setting.component';
import {AdminEmployeeClockInComponent} from './pages/admin/employee/clockIn/clockIn.component';
import {AdminEmployeeClockInRecordsComponent} from './pages/admin/employee/clockIn/records/records.component';
import {AdminEmployeeMessageComponent} from './pages/admin/employee/message/message.component';
import {AdminEmployeeFeedbackComponent} from './pages/admin/employee/feedback/feedback.component';
import {AdminEmployeeADMComponent} from './pages/admin/employee/adm/adm.component';
import {AdminEmployeeADMOthersComponent} from './pages/admin/employee/adm/others/others.component';
import {AdminEmployeeADMOthersAboutComponent} from './pages/admin/employee/adm/others/about/about.component';
import {AdminEmployeeADMLeaveComponent} from './pages/admin/employee/adm/leave/leave.component';
import {AdminEmployeeADMQuitComponent} from './pages/admin/employee/adm/quit/quit.component';
import {AdminEmployeeADMApprovalsEventsComponent} from './pages/admin/employee/adm/approvals/events/events.component';
import {AdminEmployeeADMApprovalsEventsEventComponent} from './pages/admin/employee/adm/approvals/events/event/event.component';
import {AdminEmployeeADMWagesComponent} from './pages/admin/employee/adm/wages/wages.component';
import {AdminEmployeeCoursesComponent} from './pages/admin/employee/courses/courses.component';
import {AdminEmployeeCoursesMineComponent} from './pages/admin/employee/courses/mine/mine.component';
import {AdminEmployeeServiceComponent} from './pages/admin/employee/service/service.component';
import {AdminEmployeeOrdersComponent} from './pages/admin/employee/orders/orders.component';
import {AdminEmployeeOrdersProtocolComponent} from './pages/admin/employee/orders/protocol/protocol.component';

import {AdminUploaderAvatarComponent} from './pages/admin/uploader/avatar/avatar.component';
import {AdminUploaderGalleryComponent} from './pages/admin/uploader/gallery/gallery.component';

import {AppPayComponent} from './pages/pay/pay.component';

const appFrontRedRoutes: Routes = [
  {path: 'get', component: FrontRedGetComponent},
  {
    path: '**', redirectTo: 'get'
  }
];

const appAdminRoutes: Routes = [
  {path: 'index', component: AdminIndexComponent},
  {path: 'login', component: AdminLoginComponent},
  {path: 'register/recruiter', component: AdminRegisterRecruiterComponent},
  {path: 'employee', component: AdminEmployeeComponent},
  {path: 'employee/clockIn', component: AdminEmployeeClockInComponent},
  {path: 'employee/clockIn/records', component: AdminEmployeeClockInRecordsComponent},
  {path: 'employee/profile/:id', component: AdminEmployeeProfileComponent},
  {path: 'employee/setting', component: AdminEmployeeSettingComponent},
  {path: 'employee/message', component: AdminEmployeeMessageComponent},
  {path: 'employee/feedback', component: AdminEmployeeFeedbackComponent},
  {path: 'employee/ADM', component: AdminEmployeeADMComponent},
  {path: 'employee/ADM/others', component: AdminEmployeeADMOthersComponent},
  {path: 'employee/ADM/others/about', component: AdminEmployeeADMOthersAboutComponent},
  {path: 'employee/ADM/leave', component: AdminEmployeeADMLeaveComponent},
  {path: 'employee/ADM/quit', component: AdminEmployeeADMQuitComponent},
  {path: 'employee/ADM/approvals/events/:typeId', component: AdminEmployeeADMApprovalsEventsComponent},
  {path: 'employee/ADM/approvals/events/event/:eventId', component: AdminEmployeeADMApprovalsEventsEventComponent},
  {path: 'employee/ADM/wages', component: AdminEmployeeADMWagesComponent},
  {path: 'employee/courses', component: AdminEmployeeCoursesComponent},
  {path: 'employee/courses/mine', component: AdminEmployeeCoursesMineComponent},
  {path: 'employee/service', component: AdminEmployeeServiceComponent},
  {path: 'employee/orders', component: AdminEmployeeOrdersComponent},
  {path: 'employee/orders/protocol/:id', component: AdminEmployeeOrdersProtocolComponent},

  {path: 'employer', component: AdminEmployerComponent},
  {path: 'employer/order/list', component: AdminEmployerOrderListComponent},
  {path: 'employer/order/details/:conId', component: AdminEmployerOrderDetailsComponent},
  {path: 'employer/order/protocol/:id', component: AdminEmployerOrderProtocolsComponent},
  {path: 'employer/employees', component: AdminEmployerEmployeesComponent},
  {path: 'employer/employees/employee/:id', component: AdminEmployerEmployeesEmployeeComponent},
  {path: 'employer/employees/employee/profile/:id', component: AdminEmployerEmployeesEmployeeProfileComponent},
  {path: 'employer/employees/employee/exchange/:id', component: AdminEmployerEmployeesEmployeeExchangeComponent},
  {path: 'employer/employees/employee/attendance/employees', component: AdminEmployerEmployeesEmployeeAttendanceEmployeesComponent},
  {path: 'employer/employees/employee/attendance/:id', component: AdminEmployerEmployeesEmployeeAttendanceComponent},
  {path: 'employer/approvals/leaves', component: AdminEmployerApprovalsLeavesComponent},
  {path: 'employer/approvals/leaves/leave/:eventId', component: AdminEmployerApprovalsLeavesLeaveComponent},
  {path: 'employer/rate/list', component: AdminEmployerRateListComponent},
  {path: 'employer/rate/details', component: AdminEmployerRateDetailsComponent},
  {path: 'employer/rate/add/:id', component: AdminEmployerRateAddComponent},
  {path: 'employer/message', component: AdminEmployerMessageComponent},
  {path: 'employer/feedback', component: AdminEmployerFeedbackComponent},
  {path: 'employer/recruitment', component: AdminEmployerRecruitmentComponent},
  {path: 'employer/recruitment/records', component: AdminEmployerRecruitmentRecordsComponent},
  {path: 'uploader/avatar', component: AdminUploaderAvatarComponent},
  {path: 'uploader/gallery', component: AdminUploaderGalleryComponent},
  {
    path: '**', redirectTo: 'index'
  }
];

const appFrontRoutes: Routes = [
  {path: 'index', component: FrontIndexComponent},
  {path: 'resume/post', component: FrontResumePostComponent},
  {path: 'resume/job', component: FrontResumeJobComponent},
  {path: 'employees', component: FrontEmployeesComponent},
  {path: 'employees/employee/:id', component: FrontEmployeesEmployeeComponent},
  {path: 'employees/employee/reserve/:id', component: FrontEmployeesEmployeeReserveComponent},
  {path: 'employees/employee/rates/:id', component: FrontEmployeesEmployeeRatesComponent},
  {path: 'guide', component: FrontGuideComponent},
  {path: 'guide/step1', component: FrontGuideStep1Component},
  {path: 'guide/step1/custom', component: FrontGuideStep1CustomComponent},
  {path: 'guide/step2', component: FrontGuideStep2Component},
  {path: 'guide/step3', component: FrontGuideStep3Component},
  {path: 'guide/step4', component: FrontGuideStep4Component},
  {path: 'investigate', component: FrontInvestigateComponent},
  {path: 'investigate/wish/:id', component: FrontInvestigateWishComponent},
  {path: 'investigate/success', component: FrontInvestigateSuccessComponent},
  {path: 'msg/success', component: FrontMsgSuccessComponent},
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

  {path: '', redirectTo: '/front/employees', pathMatch: 'full'},
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
