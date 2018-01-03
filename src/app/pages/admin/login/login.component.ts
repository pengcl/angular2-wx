import {Component, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {WXService} from '../../../services/wx.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  userId: string;
  user: any;

  /*disabled: boolean = true;
  loading: boolean = true;
  mini: boolean = true;*/

  constructor(private wx: WXService, private userSvc: UserService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      name: new FormControl('Semlinker'),
      location: new FormControl('China, CN')
    });

    if (this.wx.isWx()) {
      this.userId = this.userSvc.isLogin();
      this.userSvc.getUser(this.userId).then(user => {
        this.user = user;
        console.log(this.user);
      });
    }
  }

  onSubmit({ value, valid }: { value, valid: boolean }) {
    console.log(value, valid);
  }
}
