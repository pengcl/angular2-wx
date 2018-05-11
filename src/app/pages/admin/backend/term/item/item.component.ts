import {Component, OnInit, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../services/user.service';
import {TraineeService} from '../../../../../services/backend/trainee.service';
import {TermService} from '../../../../../services/backend/term.service';
import {Observable} from 'rxjs/Observable';
import {InfiniteLoaderComponent, PickerService} from 'ngx-weui';

@Component({
  selector: 'app-admin-backend-term-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class AdminBackendTermItemComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  @ViewChild(InfiniteLoaderComponent) il;

  constructor(private picker: PickerService,
              private userSvc: UserService,
              private traineeSvc: TraineeService,
              private termSvc: TermService) {
  }

  ngOnInit() {
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    Observable.timer(500).subscribe(() => {

      /*if (this.params.page < this.params.totalPage) {
        this.params.page = this.params.page + 1;
        this.traineeSvc.getCommons(this.params).then(res => {
          if (res.code === 0) {
            this.params.totalPage = res.totalPage;
            this.trainees = this.trainees.concat(res.list);
          }
        });
      }

      if (this.params.page === this.params.totalPage) {
        comp.setFinished();
        return;
      }

      comp.resolveLoading();*/
    });
  }
}
