import {Component, OnInit, Input} from '@angular/core';
import {ModalService} from '../../services/modal.service';

import {Modal} from '../../models/modal.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() dialog: any;

  constructor(private modal: ModalService) {
  }

  ngOnInit() {
    this.modal.getter().subscribe((result) => {
      this.dialog = result;
    });
  }

  hide() {
    this.dialog = false;
  }
}
