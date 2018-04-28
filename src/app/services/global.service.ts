import {Injectable} from '@angular/core';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GlobalService {

  menuOpen: Observable<boolean>;

  constructor() {
  }

  updateMenuVar(n: boolean) {
    this.menuOpen = new Observable<boolean>(observer => {
      observer.next(n);
      observer.complete();
    });
  }
}
