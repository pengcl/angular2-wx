import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuService} from '../../../modules/menu/menu.service';

@Component({
  selector: 'app-admin-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminBackendComponent implements OnInit {
  menuShow;

  constructor(private menuSvc: MenuService) {
    menuSvc.get().subscribe(res => {
      console.log(res);
      this.menuShow = res;
    });
  }

  ngOnInit() {
  }

  menu() {
    this.menuSvc.hide();
  }
}
