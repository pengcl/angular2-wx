import {StorageService} from './storage.service';
import {WXService} from './wx.service';
import {UserService} from './user.service';
import {ToastService} from './toast.service';
import {ModalService} from './modal.service';
import {LoaderService} from './loader.service';
import {JWeiXinService} from './jweixin.service';

export const SERVICES_DECLARATIONS = [
  StorageService,
  WXService,
  UserService,
  ToastService,
  ModalService,
  LoaderService,
  JWeiXinService
];
