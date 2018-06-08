import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {appWxRoutes} from './pages/wx/wx-routing.module';
import {appAdminBackendRoutes} from './pages/admin/backend/backend-routing.module';
import {appAdminArticleRoutes} from './pages/admin/article/article-routing.module';
import {appAdminSalesmenRoutes} from './pages/admin/salesmen/salesmen-routing.module';
import {appGuideRoutes} from './pages/guide/guide-routing.module';

import {FrontComponent} from './pages/front/front.component';
import {FrontIndexComponent} from './pages/front/index/index.component';
import {FrontNewsComponent} from './pages/front/news/news.component';
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
import {FrontMsgReserveComponent} from './pages/front/msg/reserve/reserve.component';

import {FrontInviteBecomeComponent} from './pages/front/invate/become/become.component';

import {AdminComponent} from './pages/admin/admin.component';
import {AdminLoginComponent} from './pages/admin/login/login.component';
import {AdminRegisterRecruiterComponent} from './pages/admin/register/recruiter/recruiter.component';
import {AdminIndexComponent} from './pages/admin/index/index.component';
import {AdminHomeComponent} from './pages/admin/home/home.component';

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
import {AdminEmployerOrderUnderlineComponent} from './pages/admin/employer/order/underline/underline.component';
import {AdminEmployerOrderConfirmComponent} from './pages/admin/employer/order/confirm/confirm.component';
import {AdminEmployerOrderSuccessComponent} from './pages/admin/employer/order/success/success.component';
import {AdminEmployerOrderFqaComponent} from './pages/admin/employer/order/fqa/fqa.component';
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
import {AdminEmployeeSchoolIndexComponent} from './pages/admin/employee/school/index/index.component';
import {AdminEmployeeSchoolCurriculumCourseDetailsComponent} from './pages/admin/employee/school/curriculum/course/details/details.component';
import {AdminEmployeeSchoolCurriculumCourseItemComponent} from './pages/admin/employee/school/curriculum/course/item/item.component';
import {AdminEmployeeSchoolCurriculumCourseListComponent} from './pages/admin/employee/school/curriculum/course/list/list.component';
import {AdminEmployeeSchoolCurriculumCourseSpcListComponent} from './pages/admin/employee/school/curriculum/course/spc/list/list.component';
import {AdminEmployeeSchoolCurriculumCourseSpcDetailsComponent} from './pages/admin/employee/school/curriculum/course/spc/details/details.component';
import {AdminEmployeeSchoolExamIndexComponent} from './pages/admin/employee/school/exam/index/index.component';
import {AdminEmployeeSchoolExamDetailsComponent} from './pages/admin/employee/school/exam/details/details.component';
import {AdminEmployeeSchoolExamOnComponent} from './pages/admin/employee/school/exam/on/on.component';
import {AdminEmployeeSchoolExamPreviewComponent} from './pages/admin/employee/school/exam/preview/preview.component';
import {AdminEmployeeSchoolExamResultComponent} from './pages/admin/employee/school/exam/result/result.component';
import {AdminEmployeeSchoolExamMsgSuccessComponent} from './pages/admin/employee/school/exam/msg/success/success.component';
import {AdminEmployeeWorkComponent} from './pages/admin/employee/work/work.component';
import {AdminEmployeeWorkItemComponent} from './pages/admin/employee/work/item/item.component';

import {AdminBackendComponent} from './pages/admin/backend/backend.component';
import {AdminArticleComponent} from './pages/admin/article/article.component';

import {AdminUploaderAvatarComponent} from './pages/admin/uploader/avatar/avatar.component';
import {AdminUploaderGalleryComponent} from './pages/admin/uploader/gallery/gallery.component';

import {RecruitmentComponent} from './pages/recruitment/recruitment.component';
import {RecruitmentLoginComponent} from './pages/recruitment/login/login.component';
import {RecruitmentIndexComponent} from './pages/recruitment/index/index.component';
import {RecruitmentIncomesComponent} from './pages/recruitment/incomes/incomes.component';
import {RecruitmentWithdrawComponent} from './pages/recruitment/withdraw/withdraw.component';
import {RecruitmentWithdrawAboutComponent} from './pages/recruitment/withdraw/about/about.component';
import {RecruitmentBankAddComponent} from './pages/recruitment/bank/add/add.component';
import {RecruitmentBankEditComponent} from './pages/recruitment/bank/edit/edit.component';
import {RecruitmentMsgSuccessComponent} from './pages/recruitment/msg/success/success.component';
import {RecruitmentMsgFriendComponent} from './pages/recruitment/msg/friend/friend.component';
import {RecruitmentMsgFriendGetComponent} from './pages/recruitment/msg/friend/get/get.component';
import {RecruitmentChannelDetailsComponent} from './pages/recruitment/channel/details/details.component';
import {RecruitmentAboutComponent} from './pages/recruitment/about/about.component';
import {RecruitmentArticleIncomeRulesComponent} from './pages/recruitment/article/incomeRules/incomeRules.component';
import {RecruitmentArticleRequirementsComponent} from './pages/recruitment/article/requirements/requirements.component';
import {RecruitmentRecruitersComponent} from './pages/recruitment/recruiters/recruiters.component';

import {AppPayComponent} from './pages/pay/pay.component';
import {WxComponent} from './pages/wx/wx.component';

import {GuideComponent} from './pages/guide/guide.component';
import {AdminSalesmenComponent} from './pages/admin/salesmen/salesmen.component';

const appFrontRedRoutes: Routes = [
  {path: 'get', component: FrontRedGetComponent},
  {
    path: '**', redirectTo: 'get'
  }
];

const appAdminRoutes: Routes = [
  {path: 'index', component: AdminIndexComponent},
  {path: 'home', component: AdminHomeComponent},
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

  {path: 'employee/school/index', component: AdminEmployeeSchoolIndexComponent},
  {path: 'employee/school/curriculum/course/details/:id', component: AdminEmployeeSchoolCurriculumCourseDetailsComponent},
  {path: 'employee/school/curriculum/course/item/:id', component: AdminEmployeeSchoolCurriculumCourseItemComponent},
  {path: 'employee/school/curriculum/course/list/:id', component: AdminEmployeeSchoolCurriculumCourseListComponent},
  {path: 'employee/school/curriculum/course/spc/list', component: AdminEmployeeSchoolCurriculumCourseSpcListComponent},
  {path: 'employee/school/curriculum/course/spc/details/:id', component: AdminEmployeeSchoolCurriculumCourseSpcDetailsComponent},
  {path: 'employee/school/exam/index', component: AdminEmployeeSchoolExamIndexComponent},
  {path: 'employee/school/exam/details/:id', component: AdminEmployeeSchoolExamDetailsComponent},
  {path: 'employee/school/exam/on/:id', component: AdminEmployeeSchoolExamOnComponent},
  {path: 'employee/school/exam/preview/:id', component: AdminEmployeeSchoolExamPreviewComponent},
  {path: 'employee/school/exam/result/:id', component: AdminEmployeeSchoolExamResultComponent},
  {path: 'employee/school/exam/msg/success/:id', component: AdminEmployeeSchoolExamMsgSuccessComponent},

  {path: 'employee/work', component: AdminEmployeeWorkComponent},
  {path: 'employee/work/item/:id', component: AdminEmployeeWorkItemComponent},

  {path: 'employer', component: AdminEmployerComponent},
  {path: 'employer/order/list', component: AdminEmployerOrderListComponent},
  {path: 'employer/order/details/:conId', component: AdminEmployerOrderDetailsComponent},
  {path: 'employer/order/protocol/:id', component: AdminEmployerOrderProtocolsComponent},
  {path: 'employer/order/underline/:id', component: AdminEmployerOrderUnderlineComponent},
  {path: 'employer/order/confirm/:id', component: AdminEmployerOrderConfirmComponent},
  {path: 'employer/order/success/:id', component: AdminEmployerOrderSuccessComponent},
  {path: 'employer/order/fqa', component: AdminEmployerOrderFqaComponent},
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
    path: 'salesmen',
    component: AdminSalesmenComponent,
    children: appAdminSalesmenRoutes
  },
  {
    path: 'backend',
    component: AdminBackendComponent,
    children: appAdminBackendRoutes
  },
  {
    path: 'article',
    component: AdminArticleComponent,
    children: appAdminArticleRoutes
  },
  {
    path: '**', redirectTo: 'index'
  }
];

const appFrontRoutes: Routes = [
  {path: 'index', component: FrontIndexComponent},
  {path: 'news', component: FrontNewsComponent},
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
  {path: 'msg/reserve', component: FrontMsgReserveComponent},

  {path: 'invite/become', component: FrontInviteBecomeComponent},
  {
    path: 'red',
    component: FrontRedComponent,
    children: appFrontRedRoutes
  },
  {
    path: '**', redirectTo: 'index'
  }
];

const appRecruitmentRoutes: Routes = [
  {path: 'index', component: RecruitmentIndexComponent},
  {path: 'incomes', component: RecruitmentIncomesComponent},
  {path: 'login', component: RecruitmentLoginComponent},
  {path: 'withdraw', component: RecruitmentWithdrawComponent},
  {path: 'withdraw/about', component: RecruitmentWithdrawAboutComponent},
  {path: 'bank/add', component: RecruitmentBankAddComponent},
  {path: 'bank/edit', component: RecruitmentBankEditComponent},
  {path: 'msg/success', component: RecruitmentMsgSuccessComponent},
  {path: 'msg/friend', component: RecruitmentMsgFriendComponent},
  {path: 'msg/friend/get', component: RecruitmentMsgFriendGetComponent},
  {path: 'channel/details', component: RecruitmentChannelDetailsComponent},
  {path: 'about', component: RecruitmentAboutComponent},
  {path: 'article/incomeRules', component: RecruitmentArticleIncomeRulesComponent},
  {path: 'article/requirements', component: RecruitmentArticleRequirementsComponent},
  {path: 'recruiters', component: RecruitmentRecruitersComponent},
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
  },
  {
    path: 'guide',
    component: GuideComponent,
    children: appGuideRoutes
  },
  {
    path: 'recruitment',
    component: RecruitmentComponent,
    children: appRecruitmentRoutes
  },
  {
    path: 'wx',
    component: WxComponent,
    children: appWxRoutes
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
