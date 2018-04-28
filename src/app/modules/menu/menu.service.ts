import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MenuService {

  private subject = new Subject<boolean>();

  constructor() {
  }

  show() {
    this.subject.next(true);
  }

  hide() {
    this.subject.next(false);
  }

  get(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
