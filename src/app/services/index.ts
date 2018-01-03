import {StorageService} from './storage.service';
import {WXService} from './wx.service';
import {UserService} from './user.service';
import {ToastService} from './toast.service';
import {DialogService} from './dialog.service';
import {LoaderService} from './loader.service';
import {JWeiXinService} from './jweixin.service';
import {ProductsService} from './products.service';
import {ButtonConfig} from '../components/button/button.config';

export const SERVICES_DECLARATIONS = [
  StorageService,
  WXService,
  UserService,
  ToastService,
  DialogService,
  LoaderService,
  JWeiXinService,
  ProductsService,
  ButtonConfig
];
