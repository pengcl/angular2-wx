
import {timer as observableTimer, Observable} from 'rxjs';
import {Component, OnInit, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../services/user.service';
import {TraineeService} from '../../../../../services/backend/trainee.service';
import {TermService} from '../../../../../services/backend/term.service';
import {InfiniteLoaderComponent, PickerService} from 'ngx-weui';

@Component({
  selector: 'app-admin-backend-term-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminBackendTermListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  terms;

  @ViewChild(InfiniteLoaderComponent) il;

  constructor(private picker: PickerService,
              private userSvc: UserService,
              private traineeSvc: TraineeService,
              private termSvc: TermService) {
  }

  ngOnInit() {
    this.termSvc.getTermList().then(res => {
      this.terms = res.list;
      console.log(this.terms);
    });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    observableTimer(500).subscribe(() => {

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
