import {Component, OnInit} from '@angular/core';
import {WxService} from './../../services/wx.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private wxService: WxService) {
  }

  ngOnInit() {
  }

}
