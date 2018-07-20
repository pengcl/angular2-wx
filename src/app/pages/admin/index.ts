import {AdminComponent} from './admin.component';
import {AdminLoginComponent} from './login/login.component';
import {AdminRegisterRecruiterComponent} from './register/recruiter/recruiter.component';
import {AdminIndexComponent} from './index/index.component';
import {AdminHomeComponent} from './home/home.component';
import {AdminUploaderAvatarComponent} from './uploader/avatar/avatar.component';
import {AdminUploaderCvatarComponent} from './uploader/cvatar/cvatar.component';
import {AdminUploaderGalleryComponent} from './uploader/gallery/gallery.component';
import {ADMIN_PAGES_EMPLOYER_DECLARATIONS} from './employer';
import {ADMIN_PAGES_EMPLOYEE_DECLARATIONS} from './employee';
import {ADMIN_PAGES_BACKEND_DECLARATIONS} from './backend';
import {ADMIN_PAGES_ARTICLE_DECLARATIONS} from './article';
import {ADMIN_PAGES_SALESMEN_DECLARATIONS} from './salesmen';

export const ADMIN_PAGES_DECLARATIONS = [
  AdminComponent,
  AdminLoginComponent,
  AdminRegisterRecruiterComponent,
  AdminIndexComponent,
  AdminHomeComponent,
  AdminUploaderAvatarComponent,
  AdminUploaderCvatarComponent,
  AdminUploaderGalleryComponent,
  ...ADMIN_PAGES_EMPLOYER_DECLARATIONS,
  ...ADMIN_PAGES_EMPLOYEE_DECLARATIONS,
  ...ADMIN_PAGES_BACKEND_DECLARATIONS,
  ...ADMIN_PAGES_ARTICLE_DECLARATIONS,
  ...ADMIN_PAGES_SALESMEN_DECLARATIONS
];
