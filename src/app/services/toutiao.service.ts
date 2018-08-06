import {Injectable} from '@angular/core';
import {getToutiao} from '../utils/utils';

declare var _taq: any;

@Injectable()
export class ToutiaoService {

  constructor() {
  }

  log() {
    console.log('getToutiao');
    getToutiao();
    _taq.push({convert_id: '1608011262150692', event_type: 'form'});
    _taq.push({convert_id: '1608010185864196', event_type: 'form'});
  }

}
