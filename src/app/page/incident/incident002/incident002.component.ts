import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { CommonService } from "src/app/_service/ common.service";
import { ResponseData } from "src/app/common/models/response-data.model";
import { AjaxService } from "src/app/_service/ajax.service";
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ValidateService } from 'src/app/_service/validate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/_service/message.service';
import { ModalConfirmComponent } from 'src/app/components/modal/modal-confirm/modalConfirm.component';
import { ModalErrorComponent } from 'src/app/components/modal/modal-error/modalError.component';
import { ModalSuccessComponent } from 'src/app/components/modal/modal-success/modalSuccess.component';
import { Subject, interval } from 'rxjs';
import { Entry } from 'src/app/common/models/time-entry-on-boarding.model';
import { TimeSpan } from 'src/app/common/models/time-span-on-boarding.model';

const URL = {
  LOV: "lov/list-data-detail",
  APIBUTTON05: "incident002/status",
  APIBUTTON01: "incident002/queueCutomerNotAnswer",
  APIBUTTON02: "incident002/queueCutomerBusy",
  GET_CUSTOMER: "incident002/queueCutomer",
  GET_WITH_PROBLEM: "incident002/get-with-problem",
};

@Component({
  selector: 'app-incident002',
  templateUrl: './incident002.component.html',
  styleUrls: ['./incident002.component.css']
})
export class Incident002Component implements OnInit {
  [x: string]: any;
  @ViewChild('saveModal') modalSave: ModalConfirmComponent;
  @ViewChild('errorModal') modalError: ModalErrorComponent;
  @ViewChild('modalRemark') modalRemark: ModalConfirmComponent;
  @ViewChild('successModal') modalSuccess: ModalSuccessComponent;
  id: any
  categoryCallText: any;
  phone: any;
  line: any;
  email: any;
  dayList: any;
  timeList: any;
  typeList: any;
  dateNow: any;
  date: Date;
  sandStatus: any = "";
  formData: FormGroup;
  playerIdText: any;
  phoneText: any;
  nameText: any;
  formSave: FormGroup = new FormGroup({});
  timedata1: any;
  countDownDate: any;
  IncidentList: any[] = [];
  listCheckDay: any[] = [];
  listCheckTime: any[] = [];
  listCheckService: any[] = [];
  problmeList: any[] = [];
  checkRadio1 = false;
  checkRadio2 = false;
  inlineRadio3 = false;
  checkButton01 = true;
  checkButton02 = true;
  checkButton03 = true;
  checkButton04 = false;
  checkButton05 = false;
  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private ajax: AjaxService,
    private validate: ValidateService,
    private router: Router,
    private changeDetector: ChangeDetectorRef

  ) {
    this.setFormSave();
    this.setormData();

  }
  private destroyed$ = new Subject();
  ngOnInit() {

    interval(1000).subscribe(() => {
      this.changeDetector.detectChanges();
    });

    this.dateNow = moment(new Date()).format("DD.MM.YYYY")
    this.getDay();
    this.getTime();
    this.getType();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setFormSave() {
    this.formSave = this.fb.group({
      idPlayer: [""],
      phoneNoCallBack: [""],
      remark: [""],
      countTime: [""],
      dateTime: [""],
      referentNo: [""],
      remarkProblem: [""],
      problme: [""],
      id: [""],
      problmeCode: [""],
      merchant: [""]
    });
  }
  getElapsedTime(): TimeSpan {
    this.date = new Date();
    let totalSeconds = Math.floor((new Date().getTime() - this.date.getTime()) / 1000);

    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (totalSeconds >= 3600) {
      hours = Math.floor(totalSeconds / 3600);
      totalSeconds -= 3600 * hours;
    }

    if (totalSeconds >= 60) {
      minutes = Math.floor(totalSeconds / 60);
      totalSeconds -= 60 * minutes;
    }

    seconds = totalSeconds;
    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  getIncidentWithProblem(probList) {
    this.commonService.loading();
    this.ajax.doPost(URL.GET_WITH_PROBLEM, probList).subscribe((res: ResponseData<any>) => {
      this.IncidentList = res.data;
      this.commonService.unLoading();
    });
  }
  pushDataDay(e) {


    if (this.listCheckDay.length > 0) {
      let isDelete = false;
      let i;
      for (let index = 0; index < this.listCheckDay.length; index++) {
        if (e.lovCode == this.listCheckDay[index].lovCode) {
          isDelete = true;
          i = index;
        }
      }
      if (isDelete) {
        let i = this.listCheckDay.indexOf(e.lovCode);
        if (i > -1) {
          this.listCheckDay.splice(i, 1);
        }
      } else {
        this.listCheckDay.push(e.lovCode);
      }
    } else {
      this.listCheckDay.push(e.lovCode);
    }
  }

  pushDataTime(e) {
    if (this.listCheckTime.length > 0) {
      let isDelete = false;
      let i;
      for (let index = 0; index < this.listCheckTime.length; index++) {
        if (e.lovCode == this.listCheckTime[index].lovCode) {
          isDelete = true;
          i = index;
        }
      }
      if (isDelete) {
        let i = this.listCheckTime.indexOf(e.lovCode);
        if (i > -1) {
          this.listCheckTime.splice(i, 1);
        }
      } else {
        this.listCheckTime.push(e.lovCode);
      }
    } else {
      this.listCheckTime.push(e.lovCode);
    }


  }
  pushDataService(e) {

    if (this.listCheckService.length > 0) {
      let isDelete = false;
      let i;
      for (let index = 0; index < this.listCheckService.length; index++) {
        if (e.lovCode == this.listCheckService[index].lovCode) {
          isDelete = true;
          i = index;
        }
      }
      if (isDelete) {
        let i = this.listCheckService.indexOf(e.lovCode);
        if (i > -1) {
          this.listCheckService.splice(i, 1);
        }
      } else {
        this.listCheckService.push(e.lovCode);
      }
    } else {
      this.listCheckService.push(e.lovCode);
    }

  }

  clickButton01() {
    this.categoryCallText = "ไม่รับสาย"


    this.ajax.doGet(URL.APIBUTTON01).subscribe(res => {
      if (res.data == null && MessageService.MSG.SUCCESS === res.status) {
        this.modalSuccess.openModal("กรุณารอการนำเข้าข้อมูลค่ะ");
      }
      else if (MessageService.MSG.SUCCESS === res.status && res.data != null) {
        this.id = res.data.id;
        this.nameText = res.data.name;
        this.playerIdText = res.data.idPlayer;
        this.phoneText = res.data.phone;
        this.line = res.data.line;
        this.email = res.data.email;
        this.phone = res.data.phone;
        this.formData.get('line').patchValue(res.data.line);
        this.formData.get('email').patchValue(res.data.email);
        this.formData.get('phone').patchValue(res.data.phone);
        this.checkRadio1 = false
        this.checkRadio2 = false
        this.checkRadio3 = false
        this.checkButton01 = false;
        this.checkButton02 = false;
        this.checkButton03 = false;
        this.checkButton04 = true;
        this.checkButton05 = true;
      } else {
        this.modalError.openModal("เกิดข้อผิดพลาด");
      }
    }, (err) => {

    });


  }
  clickButton02() {
    this.categoryCallText = "สายไม่ว่าง"


    this.ajax.doGet(URL.APIBUTTON02).subscribe(res => {
      if (res.data == null && MessageService.MSG.SUCCESS === res.status) {
        this.modalSuccess.openModal("กรุณารอการนำเข้าข้อมูลค่ะ");
      } else if (MessageService.MSG.SUCCESS === res.status && res.data != null) {

        this.id = res.data.id;
        this.nameText = res.data.name;
        this.playerIdText = res.data.idPlayer;
        this.phoneText = res.data.phone;
        this.line = res.data.line;
        this.email = res.data.email;
        this.phone = res.data.phone;
        this.formData.get('line').patchValue(res.data.line);
        this.formData.get('email').patchValue(res.data.email);
        this.formData.get('phone').patchValue(res.data.phone);
        this.checkRadio1 = false
        this.checkRadio2 = false
        this.checkRadio3 = false
        this.checkButton01 = false;
        this.checkButton02 = false;
        this.checkButton03 = false;
        this.checkButton04 = true;
        this.checkButton05 = true;
      } else {
        this.modalError.openModal("เกิดข้อผิดพลาด");
      }
    }, (err) => {

    });



  }
  clickButton03() {
    this.getData(" ");
  }
  clickButton04() {

  }
  clickButton05() {
    let sandStatus1;
    if (this.sandStatus == "") {
      sandStatus1 = "succees";
    } else if (this.sandStatus == "not_answer") {
      sandStatus1 = "not_answer";
    } else if (this.sandStatus == "busy") {
      sandStatus1 = "busy";
    } else if (this.sandStatus == "not_have_number") {
      sandStatus1 = "bunot_have_numbersy";
    }

    this.ajax.doPost(`${URL.APIBUTTON05}`, { id: this.id, status: sandStatus1, solveProblem: this.problmeList }).subscribe((res: ResponseData<any>) => {
      if (MessageService.MSG.SUCCESS === res.status) {
        this.checkButton01 = true;
        this.checkButton02 = true;
        this.checkButton03 = true;
        this.checkButton04 = false;
        this.checkButton05 = false;
        this.modalSuccess.openModal("สิ้นสุดการโทร");
        this.commonService.unLoading();
        sandStatus1 = null;
        this.listCheckDay = [];
        this.listCheckTime = [];
        this.listCheckService = [];
        this.clear();
        // window.location.reload();
      } else {
        this.modalError.openModal("เกิดข้อผิดพลาด");
      }
    });
    this.checkRadio1 = false
    this.checkRadio2 = false
    this.checkRadio3 = false
  }
  clear() {
    this.problmeList = [];
    this.IncidentList = [];
    this.nameText = null;
    this.phoneText = null;
    this.playerIdText = null;
    this.categoryCallText = null;
    this.formSave.reset();
    // reset
  }
  checkCall(e) {

    if (e.target.value == "not_answer") {
      this.checkRadio1 = true
      this.checkRadio2 = false
      this.checkRadio3 = false
    } else if (e.target.value == "busy") {
      this.checkRadio1 = false
      this.checkRadio2 = true
      this.checkRadio3 = false

    } else if (e.target.value == "not_have_number") {
      this.checkRadio1 = false
      this.checkRadio2 = false
      this.checkRadio3 = true
    }
    this.sandStatus = e.target.value;
  }
  setormData() {
    this.formData = this.fb.group({
      id: [''],
      affiliate: [''],
      currency: [''],
      dateOfBirth: [''],
      email: [''],
      errorCount: [''],
      groupplayer: [''],
      idPlayer: [''],
      lastLoginInfo: [''],
      line: [''],
      login: [''],
      merchant: [''],
      name: [''],
      phone: [''],
      registerInfo: [''],
      status: [''],
      statusCall: [''],
      dateTime: [""],
      remark: [""],
    });

  }

  getDay() {
    this.commonService.loading();
    this.ajax.doPost(`${URL.LOV}`, { lovKey: "CONVENINENT_DAY" }).subscribe((res: ResponseData<any>) => {
      this.dayList = res.data;
      this.commonService.unLoading();
    });
  }
  getTime() {
    this.commonService.loading();
    this.ajax.doPost(`${URL.LOV}`, { lovKey: "CONVENINENT_TIME" }).subscribe((res: ResponseData<any>) => {
      this.timeList = res.data;
      this.commonService.unLoading();
    });
  }
  getType() {
    this.commonService.loading();
    this.ajax.doPost(`${URL.LOV}`, { lovKey: "SERVICE" }).subscribe((res: ResponseData<any>) => {
      this.typeList = res.data;
      this.commonService.unLoading();
    });
  }
  async getData(id) {
    if (null == id) {
      id = " "
    }
    this.ajax.doPost(URL.GET_CUSTOMER, id.toString()).subscribe(res => {
      if (MessageService.MSG.SUCCESS === res.status && res.data != null) {
        this.id = res.data.id;
        this.nameText = res.data.name;
        this.playerIdText = res.data.idPlayer;
        this.phoneText = res.data.phone;
        this.line = res.data.line;
        this.email = res.data.email;
        this.phone = res.data.phone;
        this.formData.get('line').patchValue(res.data.line);
        this.formData.get('email').patchValue(res.data.email);
        this.formData.get('phone').patchValue(res.data.phone);

        this.formSave.patchValue({
          id: res.data.id,
          idPlayer: res.data.idPlayer,
          phoneNoCallBack: res.data.phoneNoCallBack,
          remark: res.data.remark,
          problme: res.data.problme,
          problmeCode: res.data.problmeCode,
          merchant: res.data.merchant
        })
        let probList = [];
        if (null != this.formSave.value.problmeCode) {
          for (let index = 0; index < this.formSave.value.problmeCode.length; index++) {
            probList.push(this.formSave.value.problmeCode[index]);
          }
        }
        this.problmeList = probList;
        this.sandStatus = ""
        this.categoryCallText = "สายปกติ";
        this.checkButton01 = false;
        this.checkButton02 = false;
        this.checkButton03 = false;
        this.checkButton04 = true;
        this.checkButton05 = true;
        this.getIncidentWithProblem(probList);
      } else if (res.data == null && MessageService.MSG.SUCCESS === res.status) {
        this.modalSuccess.openModal("ไม่มีปัญหาที่ติดต่อเข้ามาค่ะ");
      }
      else {
        this.modalError.openModal("เกิดข้อผิดพลาด");
      }
    }, (err) => {

    });
  }
  setText(text, index) {
    this.problmeList[index] = text;
  }
}
