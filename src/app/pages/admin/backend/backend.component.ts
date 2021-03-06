
import {filter} from 'rxjs/operators';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

import {MenuService} from '../../../modules/menu/menu.service';

@Component({
  selector: 'app-admin-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminBackendComponent implements OnInit {
  menuShow;

  constructor(private router: Router,
              private menuSvc: MenuService) {
    menuSvc.get().subscribe(res => {
      this.menuShow = res;
    });

    router.events.pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.menuShow = false;
      });
  }

  ngOnInit() {
  }

  menu() {
    this.menuSvc.hide();
  }
}
