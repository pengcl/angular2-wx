import {Component, OnInit} from '@angular/core';
import {PageConfig} from '../../../page.config';

@Component({
  selector: 'app-front-investigate-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class FrontInvestigateSuccessComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  constructor() {
  }


  ngOnInit() {
  }

}
