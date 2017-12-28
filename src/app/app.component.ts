import {Component} from '@angular/core';

import {ToastService} from './services/toast.service';

import {ToastComponent} from './components/toast/toast.component';
import {ModalComponent} from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private toast: ToastService) {
  }
}
