import {AdminComponent} from './admin.component';
import {AdminLoginComponent} from './login/login.component';
import {AdminIndexComponent} from './index/index.component';
import {AdminProfileComponent} from './profile/profile.component';
import {AdminClockInComponent} from './clockIn/clockIn.component';
import {AdminListsComponent} from './lists/lists.component';
import {AdminDetailsComponent} from './details/details.component';
import {AdminMessageComponent} from './message/message.component';
import {AdminDashboardComponent} from './dashboard/dashboard.component';
import {AdminADMComponent} from './adm/adm.component';
import {AdminUploaderAvatarComponent} from './uploader/avatar/avatar.component';
import {AdminUploaderGalleryComponent} from './uploader/gallery/gallery.component';
import {AdminSettingComponent} from './setting/setting.component';
import {ADMIN_PAGES_FORM_DECLARATIONS} from './form';
import {ADMIN_PAGES_ORDER_DECLARATIONS} from './order';

export const ADMIN_PAGES_DECLARATIONS = [
  AdminComponent,
  AdminLoginComponent,
  AdminIndexComponent,
  AdminProfileComponent,
  AdminClockInComponent,
  AdminListsComponent,
  AdminDetailsComponent,
  AdminMessageComponent,
  AdminDashboardComponent,
  AdminADMComponent,
  AdminSettingComponent,
  AdminUploaderAvatarComponent,
  AdminUploaderGalleryComponent,
  ...ADMIN_PAGES_FORM_DECLARATIONS,
  ...ADMIN_PAGES_ORDER_DECLARATIONS
];
