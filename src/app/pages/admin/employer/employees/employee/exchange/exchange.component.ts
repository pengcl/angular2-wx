import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageConfig} from './page.config';
import {WxService} from '../../../../../../modules/wx';
import {UserService} from '../../../../../../services/user.service';
import {EmployeeService} from '../../../../../../services/employee.service';
import {Config} from '../../../../../../config';
import {EmployerService} from '../../../../../../services/employer.service';

@Component({
  selector: 'app-admin-employer-employees-employee-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class AdminEmployerEmployeesEmployeeExchangeComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  config = Config;
  user: any;
  exchangeForm: FormGroup;
  housekeeper;

  constructor(private router: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private employee: EmployeeService,
              private employer: EmployerService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.exchangeForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      housekeeperId: new FormControl('', [Validators.required]),
      remark: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      agree: new FormControl('', [Validators.required]),
    });
    this.exchangeForm.get('custId').setValue(this.user.id);
    this.exchangeForm.get('housekeeperId').setValue(this.router.snapshot.paramMap.get('id'));
    this.employee.getHousekeeper(this.router.snapshot.paramMap.get('id')).then(res => {
      this.housekeeper = res.housekeeper;
    });
  }

  onSubmit() {
    this.employer.exchange(this.exchangeForm.value).then(res => {
      console.log(res);
    });
  }

}
