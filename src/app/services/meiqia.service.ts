import {Injectable} from '@angular/core';
import {LoaderService} from './loader.service';
import {getMeiqia} from '../utils/utils';

declare var _MEIQIA: any;

@Injectable()
export class MeiqiaService {

  constructor(private load: LoaderService) {
  }

  show() {
    getMeiqia();
    _MEIQIA('showPanel');
  }

}
