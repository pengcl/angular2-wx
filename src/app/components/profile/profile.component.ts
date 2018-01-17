import {Component, Input, OnInit} from '@angular/core';
import {Config} from '../../config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() profile;
  config: any = Config;

  constructor() {
  }

  ngOnInit() {
  }

}
