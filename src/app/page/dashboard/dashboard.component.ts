import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_service/user.service.';
import { Setting } from 'src/app/_setting/setting';
import { ModalAlertComponent } from 'src/app/components/modal/modal-alert/modalAlert.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  public id: string;
  public authorities: any = null;
  public role :any = null;
  public path :any = null;
  @ViewChild('errorModal') modalError: ModalAlertComponent;
  public bodyModal = ""
  constructor(private route: ActivatedRoute
          , public userSV: UserService) { 
    this.authorities = this.userSV.currentUserValue.authorities;
    this.role = Setting.ROLE;
    this.path = Setting.PATH;
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.route.snapshot.queryParams['permission']){
      this.bodyModal = "กรุณาตรวจสอบสิทธิ์การใช้งาน"
      this.modalError.openModal();
    }
    if(this.id == null){
      this.id = '';
    }
    
  }
}
