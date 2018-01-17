import {StorageService} from './storage.service';
import {GeoService} from './geo.service';
import {DateService} from './date.service';
import {WXService} from './wx.service';
import {UserService} from './user.service';
import {ToastService} from './toast.service';
import {LoaderService} from './loader.service';
import {JWeiXinService} from './jweixin.service';
import {ProductsService} from './products.service';
import {ButtonConfig} from '../components/button/button.config';
import {MoService} from './mo.service';
import {ButlerService} from './butler.service';
import {EventService} from './event.service';

export const SERVICES_DECLARATIONS = [
  StorageService,
  GeoService,
  DateService,
  WXService,
  UserService,
  ToastService,
  LoaderService,
  JWeiXinService,
  ProductsService,
  ButtonConfig,
  MoService,
  ButlerService,
  EventService
];
