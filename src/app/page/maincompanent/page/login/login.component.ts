import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AjaxService } from 'src/app/_service/ajax.service';
import { ResponseData } from 'src/app/common/models/response-data.model';
import { CommonService } from 'src/app/_service/ common.service';
import { User } from 'src/app/_model/user';
import { UserService } from 'src/app/_service/user.service.';
import { catchError } from 'rxjs/operators';
import { ModalErrorComponent } from 'src/app/components/modal/modal-error/modalError.component';
import { ModalAlertComponent } from 'src/app/components/modal/modal-alert/modalAlert.component';
import { Setting } from 'src/app/_setting/setting';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public imagePath: string;
  public username: string = '';
  public password: string = '';
  public modalRef: BsModalRef;
  public user: User = new User;
  public bodyModal: string = "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง";
  private role: any;
  private path: any;
  constructor(private router: Router
    , private route: ActivatedRoute
    , private modalService: BsModalService
    , private ajax: AjaxService
    , private commonService: CommonService
    , private userSV: UserService) {
    this.role = Setting.ROLE;
    this.path = Setting.PATH;
  }
  @ViewChild('errorModal') modalError: ModalAlertComponent;
  ngOnInit() {
    this.userSV.logout();
    this.imagePath = location.origin + location.pathname + '/assets/img/Logo_AOT.png';
  }

  login(template) {
    //console.log("login");
    this.commonService.loading();
    let param = { username: this.username, password: this.password };
    this.ajax.doPostLogin("token/generate-token", param).subscribe((response) => {
      this.commonService.unLoading();
      if (response) {
        if (!response.authorities) {
          this.bodyModal = "กรุณาตรวจสอบสิทธิ์การใช้งาน";
          this.userSV.logout();
          this.modalError.openModal();
        } else {
          let authoritiesList = response.authorities.split(",");
          this.user.fullName = response.fullName;
          this.user.token = response.token;
          this.user.organizeCode = response.organizeCode;
          this.user.organizeDesc = response.organizeDesc;
          console.log(authoritiesList);
          this.user.username = response.username;
          this.user.authorities = this.prcessAuthen(authoritiesList);
          console.log();
          this.userSV.logIn(this.user);
          this.router.navigate(['/home']);

        }

      } else {
        this.userSV.logout();
      }// else

    },
      error => {
        this.bodyModal = "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง";
        this.userSV.logout();
        this.modalError.openModal();
      }

    );// subscribe
  }

  prcessAuthen(authoritiesList: any) {
    let authen: any = {
      [this.path.INCIDENT_001]: this.userSV.validateCategory(authoritiesList, this.path.INCIDENT_001)
      , [this.path.INCIDENT_002]: this.userSV.validateCategory(authoritiesList, this.path.INCIDENT_002)
      , [this.path.ONBOARDING]: this.userSV.validateMenu2(authoritiesList, this.path.ONBOARDING)
      , [this.path.SETTING]: this.userSV.validateMenu2(authoritiesList, this.path.SETTING)
      , [this.path.UPLOAD]: this.userSV.validateMenu2(authoritiesList, this.path.UPLOAD)
    }
    return authen;
  }

}
