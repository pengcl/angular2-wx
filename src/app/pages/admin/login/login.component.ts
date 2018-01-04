import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {WXService} from '../../../services/wx.service';
import {Router, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  userId: string;
  user: any;

  constructor(private router: Router, private wx: WXService, private userSvc: UserService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      mobile: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      code: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
    });

    if (this.wx.isWx()) {
      this.userId = this.userSvc.isLogin();
      this.userSvc.getUser(this.userId).then(user => {
        this.user = user;
      });
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.router.navigate(['/admin/index'], {queryParamsHandling: 'merge'});
    }
  }
}
