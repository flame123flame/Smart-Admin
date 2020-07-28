import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { CommonService } from "src/app/_service/ common.service";
import { ResponseData } from "src/app/common/models/response-data.model";
import { AjaxService } from "src/app/_service/ajax.service";
import { ModalCustomComponent } from 'src/app/components/modal/modal-custom/modalCustom.component';

import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

const URL = {
  LOV: "lov/list-data-detail",
  FIND_BY_PHONE: "incident001/find-customer-by-phone",
  GET: "incident001/get",
  FIND_BY_ID: "incident001/find-customer-by-id",
  INCIDENT_BY_ID: "incident001/find-incident-by-id",
  SAVE: "incident001/save",
  GET_COUNT_STATE: "incident001/getState",
};

@Component({
  selector: 'app-incident001',
  templateUrl: './incident001.component.html',
  styleUrls: ['./incident001.component.css']
})
export class Incident001Component implements OnInit {
  @ViewChild('searchCutomerModel') searchCutomerModel: ModalCustomComponent;
  @ViewChild('infoCutomerModel') infoCutomerModel: ModalCustomComponent;

  phoneNumber: String = new String;
  problem: any;
  timeList: any;
  typeList: any;
  dateNow: any;
  incidentList: any;
  customerPhoneList: any;
  idPlayer: any;
  isButton: Boolean = false;
  info: any = {
    problme: []
  };
  infoTimeShow: any;
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
  customerData: any = {
    phone: "",
    name: "",
    merchant: "",
  };
  listCheck: any[] = [];
  formSave: FormGroup = new FormGroup({});

  constructor(
    private commonService: CommonService,
    private ajax: AjaxService,
    private formBuilder: FormBuilder,
  ) {
    this.formSave = this.formBuilder.group({
      idPlayer: [""],
      phoneNoCallback: [""],
      remark: [""],
      countTime: [""],
      dateTime: [""],
      referentNo: [""]
    });
  }

  ngOnInit() {
    this.dateNow = moment(new Date()).format("DD.MM.YYYY")
    this.getDay();
    this.getIncident();
    this.getCountState();
  }

  getCountState() {
    this.commonService.loading();
    this.ajax.doPost(URL.GET_COUNT_STATE, {}).subscribe((res: ResponseData<any>) => {
      this.stateCount = res.data
      this.commonService.unLoading();

    });
  }
  getIncident() {
    this.commonService.loading();
    this.ajax.doPost(URL.GET, {}).subscribe((res: ResponseData<any>) => {
      this.incidentList = res.data;
      console.log(this.incidentList)
      this.commonService.unLoading();
    });
  }

  searchCutomerModelOpen() {
    this.searchCutomerModel.openModal(ModalCustomComponent.MODAL_SIZE.LARGE);
  }
  searchCutomerModelClose() {

    this.searchCutomerModel.close()
  }
  infoCutomerModelOpen(item) {

    this.commonService.loading();
    this.ajax.doPost(URL.INCIDENT_BY_ID, item.id.toString()).subscribe((res: ResponseData<any>) => {

      this.info = item;
      this.info.problme = res.data.problme;
      this.infoTimeShow = moment(this.info.dateTime).format('DD.MM.YYYY')
      this.commonService.unLoading();
    });
    this.infoCutomerModel.openModal(ModalCustomComponent.MODAL_SIZE.LARGE);
  }
  infoCutomerModelClose() {

    this.infoCutomerModel.close()
  }


  getDay() {
    this.commonService.loading();
    this.ajax.doPost(`${URL.LOV}`, { lovKey: "PROBLEM" }).subscribe((res: ResponseData<any>) => {
      this.problem = res.data;
      this.commonService.unLoading();
    });
  }

  search() {

    this.commonService.loading();
    this.ajax.doPost(URL.FIND_BY_PHONE, this.phoneNumber).subscribe((res: ResponseData<any>) => {
      this.customerPhoneList = res.data;
      this.searchCutomerModelOpen()
      this.commonService.unLoading();
    });
  }

  getCustomerById(id) {
    let data = parseFloat(id).toFixed(0);
    this.commonService.loading();
    this.ajax.doPost(URL.FIND_BY_ID, data.toString()).subscribe((res: ResponseData<any>) => {
      this.customerData = res.data;
      this.formSave.patchValue({
        phoneNoCallback: this.customerData.phone
      })
      this.idPlayer = res.data.idPlayer
      this.isButton = true
      this.searchCutomerModelClose();
      this.commonService.unLoading();
    });
  }
  pushData(e) {
    if (this.listCheck.length > 0) {
      let isDelete = false;
      let i;
      for (let index = 0; index < this.listCheck.length; index++) {
        if (e.lovCode == this.listCheck[index].lovCode) {
          isDelete = true;
          i = index;
        }
      }
      if (isDelete) {
        let i = this.listCheck.indexOf(e.lovCode);
        if (i > -1) {
          this.listCheck.splice(i, 1);
        }
      } else {
        this.listCheck.push(e.lovCode);
      }
    } else {
      this.listCheck.push(e.lovCode);
    }
  }
  save() {
    this.commonService.loading();

    this.formSave.value.idPlayer = this.idPlayer
    this.formSave.value.dateTime = moment(this.dateNow, "DD.MM.YYYY").format("DD/MM/YYYY")
    this.formSave.value.referentNo = this.customerData.referenceNo;

    let data = this.formSave.value;
    data.listPob = this.listCheck;
    this.ajax.doPost(URL.SAVE, data).subscribe((res: ResponseData<any>) => {

      this.commonService.unLoading();
      // window.location.reload();
      this.clear();
    });
  }
  clear() {
    this.phoneNumber = new String;
    this.customerData = {
      phone: "",
      name: "",
      merchant: "",
      referenceNo: ""
    };
    this.idPlayer = null;
    this.problem = null;
    this.getDay()
    this.formSave.reset();
    this.isButton = false;
    this.incidentList = null;
    this.getIncident()
    this.getCountState()
    this.customerPhoneList = null;
    this.info = {
      problme: []
    };
  }
}
