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
import { ModalCustomComponent } from 'src/app/components/modal/modal-custom/modalCustom.component';


const URL = {
  LOV: "lov/list-data-detail",
  APIBUTTON05: "onboarding001/status",
  APIBUTTON01: "onboarding001/queueCutomerNotAnswer",
  APIBUTTON02: "onboarding001/queueCutomerBusy",
  SAVE: "onboarding001/save",
  GET: "onboarding001/get",
  GET_COUNT_STATE: "onboarding001/getState",
  GET_BYID: "onboarding001/getById",

};

@Component({
  selector: 'app-on-boarding001',
  templateUrl: './on-boarding001.component.html',
  styleUrls: ['./on-boarding001.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnBoarding001Component implements OnInit {
  [x: string]: any;
  @ViewChild('searchCutomerModel') searchCutomerModel: ModalCustomComponent;
  @ViewChild('saveModal') modalSave: ModalConfirmComponent;
  @ViewChild('errorModal') modalError: ModalErrorComponent;
  @ViewChild('modalRemark') modalRemark: ModalConfirmComponent;
  @ViewChild('successModal') modalSuccess: ModalSuccessComponent;
  id: any
  categoryCallText: any;
  stateCount: any = {
    day: 0,
    dayBusy: 0,
    dayNotAnswer: 0,
    daySuccess: 0,
    month: 0,
    monthBusy: 0,
    monthNotAnswer: 0,
    monthSuccess: 0,
    weeks: 0,
    weeksBusy: 0,
    weeksNotAnswer: 0,
    weeksSuccess: 0
  };
  remarkPlayer: any;
  idPlayer: any;
  namePlayer: any;
  phoneModal: any;
  lineModal: any;
  emailModal: any;
  phone: any;
  line: any;
  email: any;
  dayList: any;
  timeList: any;
  typeList: any;
  dateNow: any;
  dateOfBirth: any;
  date: any;
  time: any;
  sandStatus: any = "";
  formData: FormGroup;
  playerIdText: any;
  phoneText: any;
  nameText: any;
  totalSeconds: any;
  timedata1: any;
  countDownDate: any;
  OnboadingList: any[] = [];
  listCheckDay: any[] = [];
  listCheckTime: any[] = [];
  listCheckService: any[] = [];
  listCardDetail: any[] = [];
  isShowTimeStart = true;
  isShowTime = false;
  checkRadio1 = false;
  checkRadio2 = false;
  inlineRadio3 = false;
  checkButton01 = true;
  checkButton02 = true;
  checkButton03 = true;
  checkButton04 = false;
  checkButton05 = false;
  uncheck = false;
  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private ajax: AjaxService,
    private validate: ValidateService,
    private router: Router,
    private changeDetector: ChangeDetectorRef

  ) {
    this.setormData();
  }
  private destroyed$ = new Subject();
  ngOnInit() {
    this.getCountState();
    this.getOnboading();
    this.dateNow = moment(new Date()).format("DD.MM.YYYY")
    this.getDay();
    this.getTimeOnbo();
    this.getType();
  }

  getStartTime() {
    this.date = new Date().getTime();
    interval(1000).subscribe(() => {
      this.changeDetector.detectChanges();
    });
  }


  getElapsedTime(id: any): TimeSpan {
    this.totalSeconds = Math.floor((new Date().getTime() - this.date) / 1000);
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    if (this.totalSeconds >= 3600) {
      hours = Math.floor(this.totalSeconds / 3600);
      this.totalSeconds -= 3600 * hours;
    }
    if (this.totalSeconds >= 60) {
      minutes = Math.floor(this.totalSeconds / 60);
      this.totalSeconds -= 60 * minutes;
    }
    seconds = this.totalSeconds;
    this.time = hours + minutes + seconds;

    var num01 = hours;
    var hoursFix = Number(num01.toFixed(2));
    var num02 = minutes;
    var minutesFix = Number(num02.toFixed(2));
    var num03 = seconds;
    var secondsFix = Number(num03.toFixed(2));

    this.formData.get('countTime').patchValue(hoursFix + "." + minutesFix + "." + secondsFix);

    return {
      hours: hoursFix,
      minutes: minutesFix,
      seconds: secondsFix
    };

  }

  getOnboading() {
    this.ajax.doPost(URL.GET, {}).subscribe((res: ResponseData<any>) => {
      this.OnboadingList = res.data;
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


    this.ajax.doGet('onboarding001/queueCutomerNotAnswer').subscribe(res => {
      if (res.data == null && MessageService.MSG.SUCCESS === res.status) {
        this.modalSuccess.openModal("กรุณารอการนำเข้าข้อมูลค่ะ");
      }
      else if (MessageService.MSG.SUCCESS === res.status) {
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


    this.ajax.doGet('onboarding001/queueCutomerBusy').subscribe(res => {
      if (res.data == null && MessageService.MSG.SUCCESS === res.status) {
        this.modalSuccess.openModal("กรุณารอการนำเข้าข้อมูลค่ะ");
      }
      else if (MessageService.MSG.SUCCESS === res.status) {

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


    this.getData();

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
    this.save(sandStatus1);
    this.ajax.doPost(`${URL.APIBUTTON05}`, { id: this.id, status: sandStatus1 }).subscribe((res: ResponseData<any>) => {
      if (MessageService.MSG.SUCCESS === res.status) {
        this.checkButton01 = true;
        this.checkButton02 = true;
        this.checkButton03 = true;
        this.checkButton04 = false;
        this.checkButton05 = false;
        sandStatus1 = null;
        this.listCheckDay = [];
        this.listCheckTime = [];
        this.listCheckService = [];
        this.cler();
        this.getDay();
        this.getTimeOnbo();
        this.getType();
        this.commonService.unLoading();
        this.modalSuccess.openModal("บันทึกข้อมูลสำเร็จ");
        // window.location.reload();
      } else {
        this.modalError.openModal("เกิดข้อผิดพลาด");
      }
    });
    this.checkRadio1 = false
    this.checkRadio2 = false
    this.checkRadio3 = false
    this.isShowTimeStart = true;
    this.isShowTime = false;
  }
  cler() {
    this.formData.reset();
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
      countTime: [""],
      listDay: [""],
      listTime: [""],
      listService: [""],
    });
  }

  getDay() {
    this.commonService.loading();
    this.ajax.doPost(`${URL.LOV}`, { lovKey: "CONVENINENT_DAY" }).subscribe((res: ResponseData<any>) => {
      this.dayList = res.data;
      this.commonService.unLoading();
    });
  }
  getTimeOnbo() {
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
  async getData() {
    this.ajax.doGet('onboarding001/queueCutomer').subscribe(res => {
      if (res.data == null && MessageService.MSG.SUCCESS === res.status) {
        this.modalSuccess.openModal("กรุณารอการนำเข้าข้อมูลค่ะ");
      }
      else if (MessageService.MSG.SUCCESS === res.status) {
        this.id = res.data.id;
        this.merchant = res.data.merchant;
        this.nameText = res.data.name;
        this.playerIdText = res.data.idPlayer;
        this.phoneText = res.data.phone;
        this.line = res.data.line;
        this.email = res.data.email;
        this.phone = res.data.phone;
        this.formData.get('line').patchValue(res.data.line);
        this.formData.get('email').patchValue(res.data.email);
        this.formData.get('phone').patchValue(res.data.phone);
        this.sandStatus = ""
        this.categoryCallText = "สายปกติ";
        this.checkButton01 = false;
        this.checkButton02 = false;
        this.checkButton03 = false;
        this.checkButton04 = true;
        this.checkButton05 = true;
        this.isShowTimeStart = false;
        this.isShowTime = true;
        this.getStartTime();
      } else {
        this.modalError.openModal("เกิดข้อผิดพลาด");
      }
    }, (err) => {

    });
  }
  getCountState() {
    this.commonService.loading();
    this.ajax.doPost(URL.GET_COUNT_STATE, {}).subscribe((res: ResponseData<any>) => {
      this.stateCount = res.data
      this.commonService.unLoading();

    });
  }
  save(sandStatus) {
    this.commonService.loading();

    this.formData.value.idPlayer = this.playerIdText
    this.formData.value.line = this.line
    this.formData.value.email = this.email
    this.formData.value.phone = this.phone
    this.formData.value.dateTime = moment(this.dateNow, "DD.MM.YYYY").format("DD/MM/YYYY")

    let data = this.formData.value;
    data.listDay = this.listCheckDay;
    data.listTime = this.listCheckTime;
    data.listService = this.listCheckService;
    data.callStatus = sandStatus;
    this.ajax.doPost(URL.SAVE, data).subscribe((res: ResponseData<any>) => {
      if (MessageService.MSG.SUCCESS === res.status) {
        // this.commonService.loading();
        this.getOnboading();
        // this.commonService.unLoading();
        // window.location.reload();
      } else {
        this.modalError.openModal("บันทึกข้อมูลไม่สำเร็จ");
      }

    });
  }
  findBYid(item) {
    this.ajax.doPost(URL.GET_BYID, { id: item.id }).subscribe((res: ResponseData<any>) => {
      this.phoneModal = res.data.phone
      this.lineModal = res.data.line
      this.emailModal = res.data.email
      this.idPlayer = item.merchant + item.idPlayer
      this.namePlayer = item.name
      this.remarkPlayer = item.remark
      this.dateOfBirth = moment(item.dateOfBirth, "YYYY-MM-DD").format("DD.MM.YYYY")

      this.formData.patchValue({ listDay: res.data.listDay });
      this.formData.patchValue({ listTime: res.data.listTime });
      this.formData.patchValue({ listService: res.data.listService });
      this.commonService.unLoading();
    });
    this.searchCutomerModelOpen();
  }
  searchCutomerModelOpen() {
    this.searchCutomerModel.openModal(ModalCustomComponent.MODAL_SIZE.LARGE);
  }
  searchCutomerModelClose() {

    this.searchCutomerModel.close()
  }

}
