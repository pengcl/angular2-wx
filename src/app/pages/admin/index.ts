import {AdminComponent} from './admin.component';
import {AdminLoginComponent} from './login/login.component';
import {AdminRegisterRecruiterComponent} from './register/recruiter/recruiter.component';
import {AdminIndexComponent} from './index/index.component';
import {AdminHomeComponent} from './home/home.component';
import {AdminUploaderAvatarComponent} from './uploader/avatar/avatar.component';
import {AdminUploaderGalleryComponent} from './uploader/gallery/gallery.component';
import {ADMIN_PAGES_EMPLOYER_DECLARATIONS} from './employer';
import {ADMIN_PAGES_EMPLOYEE_DECLARATIONS} from './employee';
import {ADMIN_PAGES_BACKEND_DECLARATIONS} from './backend';

export const ADMIN_PAGES_DECLARATIONS = [
  AdminComponent,
  AdminLoginComponent,
  AdminRegisterRecruiterComponent,
  AdminIndexComponent,
  AdminHomeComponent,
  AdminUploaderAvatarComponent,
  AdminUploaderGalleryComponent,
  ...ADMIN_PAGES_EMPLOYER_DECLARATIONS,
  ...ADMIN_PAGES_EMPLOYEE_DECLARATIONS,
  ...ADMIN_PAGES_BACKEND_DECLARATIONS
];
