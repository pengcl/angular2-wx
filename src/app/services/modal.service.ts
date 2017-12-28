import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ModalService {
  private subject = new Subject<any>();

  constructor() {
  }

  setter(message: any) {
    this.subject.next(message);
  }

  getter(): Observable<any> {
    return this.subject.asObservable();
  }
}
