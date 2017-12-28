import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ToastService {
  private subject = new Subject<any>();
  private state = {type: 'loading', auto: false};

  constructor() {
  }

  show(type?) {
    if (type) {
      this.state.type = type;
    }
    this.setter(this.state);
  }

  hide() {
    this.setter('');
  }

  setter(state) {
    this.subject.next(state);
  }

  getter(): Observable<any> {
    return this.subject.asObservable();
  }
}
