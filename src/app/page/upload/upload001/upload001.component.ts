import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';

import { ResponseData } from "src/app/common/models/response-data.model";
import { UserService } from 'src/app/_service/user.service.';
import { AjaxService } from 'src/app/_service/ajax.service';
import { CommonService } from 'src/app/_service/ common.service';
import { ModalSuccessComponent } from 'src/app/components/modal/modal-success/modalSuccess.component';
import { ModalErrorComponent } from 'src/app/components/modal/modal-error/modalError.component';
import { MessageService } from 'src/app/_service/message.service';
const URL = {
  UPLOAD_EXCEL: "import/upload-excel",
  GET_EXCEL: "import/get-excel",
  LIST: "import/get-cus"
};
declare var $: any;
@Component({
  selector: 'app-upload001',
  templateUrl: './upload001.component.html',
  styleUrls: ['./upload001.component.css']
})
export class Upload001Component implements OnInit {
  @ViewChild('successModal') successModal: ModalSuccessComponent;
  @ViewChild('errorModal') errorModal: ModalErrorComponent;
  @ViewChild('inpFileUpload') inpFileUpload: ElementRef;
  dateNow: any;
  file: any[] = [];
  dataList: any[] = [];
  dtOptions: any;
  files: any;
  excelList: any;
  filesName: any;
  constructor(
    private userSV: UserService,
    private ajax: AjaxService,
    private common: CommonService,

  ) { }

  ngOnInit() {
    this.dateNow = moment(new Date()).format("DD.MM.YYYY")
    this.getExcelList();
    // this.getList();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.initDataTable()
  }

  getExcelList() {
    this.common.loading();
    this.ajax.doPost(URL.GET_EXCEL, {}).subscribe((res: ResponseData<any>) => {
      console.log(res.data)
      this.excelList = res.data;
      this.common.unLoading();
    });
  }

  getExcelListClick(e) {
    this.common.loading();
    this.ajax.doPost(URL.LIST, e).subscribe((res: ResponseData<any>) => {
      console.log(res.data)
      this.dataList = res.data;
      this.initDataTable()
      this.common.unLoading();
    });
  }
  onChangeUpload = (event: any) => {
    console.log("event.target.files", event.target.files);
    console.log("event.target.files.length > 0s", event.target.files.length > 0);
    this.files = event.target.files[0]
    this.filesName = event.target.files[0].name
    // console.log("this.files", files);

    if (event.target.files && event.target.files.length > 0) {
      this.common.loading();
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const f = {
          name: event.target.files[0].name,
          type: event.target.files[0].type,
          value: e.target.result
        };
        this.file = [f];
      };

      setTimeout(() => {
        this.common.unLoading();
      }, 150);

    }


  }
  uploadExcel() {
    console.log("this.file[0].name", this.file);
    console.log("this.files", this.files);
    const formBody = new FormData();
    formBody.append("fileName", this.files.name);
    formBody.append("fileUpload", this.files);
    this.ajax.upload(URL.UPLOAD_EXCEL, formBody, (response) => {
      if (MessageService.MSG.SUCCESS === response.json().status) {
        this.getExcelList();
        this.successModal.openModal("นำเข้าข้อมูลสำเร็จ");
      } else {
        this.errorModal.openModal("นำเข้าข้อมูลไม่สำเร็จ");
      }
      this.common.unLoading();
    });
  }
  resetInpFileUpload() {
    this.inpFileUpload.nativeElement.value = "";
  }
  getList() {
    this.common.loading();
    this.ajax.doPost(URL.LIST, { id: "" }).subscribe((res: ResponseData<any>) => {
      this.dataList = res.data;
      this.initDataTable();
      this.common.unLoading();
    });
  }
  initDataTable() {

    if (this.dtOptions != null) {
      this.dtOptions.destroy();
    }

    this.dtOptions = $("#datatable").DataTable({
      ...this.common.configDataTable(),
      deferRender: true,
      data: this.dataList,
      columns: [
        {
          data: "idPlayer",
          className: "text-center"
        },
        {
          data: "merchant",
          className: "text-center"
        },
        {
          data: "login",
          className: "text-center"
        },
        {
          data: "affiliate",
          className: "text-center"
        },
        {
          data: "currency",
          className: "text-center"
        },
        {
          data: "groupplayer",
          className: "text-center"
        },
        {
          data: "status",
          className: "text-center"
        },
        {
          data: "phone",
          className: "text-center"
        },
        {
          data: "email",
          className: "text-center"
        },
        {
          data: "line",
          className: "text-center"
        },
        {
          data: "errorCount",
          className: "text-center"
        },
        {
          data: "registerInfo",
          className: "text-center"
        },
        {
          data: "lastLoginInfo",
          className: "text-center"
        },
        {
          data: "dateOfBirth",
          className: "text-center"
        },
        {
          data: "dateOfBirth",
          className: "text-center"
        }

      ],
    });


  }
}
