import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';
import {ModalService} from '../../../services/modal.service';
import {ToastService} from '../../../services/toast.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import {InfiniteLoaderComponent} from '../../../components/infinite-loader/infinite-loader.component';

import {Modal} from '../../../models/modal.model';

@Component({
  selector: 'app-front-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class FrontIndexComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  restartBtn = false;

  items: any[] = Array(20).fill(0).map((v: any, i: number) => i);

  @ViewChild(InfiniteLoaderComponent) il;

  constructor(private modal: ModalService, private toast: ToastService) {
  }


  ngOnInit() {
  }

  onShowModal(e) {
    this.modal.setter({
      title: 'title',
      content: 'content',
      confirm: function () {
        console.log('confirm');
      },
      cancel: function () {
        console.log('cancel');
      }
    });
  }

  onShowToast(e) {
    this.toast.show();
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    this.restartBtn = false;
    Observable.timer(1500).subscribe(() => {

      this.items.push(...Array(10).fill(this.items.length).map((v, i) => v + i));

      if (this.items.length >= 50) {
        this.restartBtn = true;
        comp.setFinished();
        return;
      }
      comp.resolveLoading();
    });
  }

  restart() {
    this.items.length = 0;
    this.il.restart();
  }

}
