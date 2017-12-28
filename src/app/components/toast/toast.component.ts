import {Component, OnInit, Input} from '@angular/core';
import {ToastService} from '../../services/toast.service';

import {Toast} from '../../models/toast.model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() state: Toast;

  constructor(private toast: ToastService) {
  }

  ngOnInit() {
    this.toast.getter().subscribe((result) => {
      this.state = result;
    });
  }

}
