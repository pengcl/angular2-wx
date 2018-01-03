import {Injectable, ComponentFactoryResolver, ApplicationRef, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BaseService} from './base.service';
import {DialogComponent} from '../components/dialog/dialog.component';

@Injectable()
export class DialogService extends BaseService {
  private subject = new Subject<any>();

  constructor(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector) {
    super(resolver, applicationRef, injector);
  }

  show(data): Observable<any> {
    const componentRef = this.build(DialogComponent);

    componentRef.instance.state = data;
    componentRef.instance.close.subscribe(() => {
      // this.destroy(componentRef);
      setTimeout(() => {
        this.destroy(componentRef);
      }, 300);
    });
    return componentRef.instance.show();
  }
}
