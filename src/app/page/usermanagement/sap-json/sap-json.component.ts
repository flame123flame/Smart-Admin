import { Component, OnInit } from '@angular/core';
import { AjaxService } from 'src/app/_service/ajax.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/_service/ common.service';
import { ResponseData } from 'src/app/common/models/response-data.model';
import { MessageService } from 'src/app/_service/message.service';
import { Router } from '@angular/router';
import { DateStringPipe } from 'src/app/common/pipes/date-string.pipe';
import { Utils } from 'src/app/common/helper';
import * as moment from 'moment';
declare var $: any;

const URL = {
  LIST: "sap/list",
}

@Component({
  selector: 'app-sap-json',
  templateUrl: './sap-json.component.html',
  styleUrls: ['./sap-json.component.css']
})
export class SapJsonComponent implements OnInit {
  dataList: any[] = [];
  dataTable: any;

  constructor(
    private ajax: AjaxService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }
  breadcrumb: any = [
    {
      label: "ตั้งค่า",
      link: "/home",
    },
    {
      label: "Moniter",
      link: "#",
    }
  ];

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.commonService.loading();
    this.ajax.doPost(URL.LIST, {}).subscribe((res: ResponseData<any>) => {
      //console.log("this.dataList : ",res.data);
      this.dataList = res.data;
      console.log("this.dataList : ", this.dataList);
      this.initDataTable();
      this.commonService.unLoading();
    });
  }

  initDataTable = () => {
    if (this.dataTable != null) {
      this.dataTable.destroy();
    }
    this.dataTable = $('#datatable').DataTable({
      lengthChange: false,
      searching: true,
      ordering: true,
      processing: true,
      serverSide: false,
      paging: true,
      data: this.dataList,
      columns: [
        {
          className: "text-center",
          render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
          }
        }, {
          data: 'sapJson', className: 'text-center',
          render(data, type, row, meta) {
            let res
            if (null != data) {

              res = JSON.parse(data).Header[0].transactionNo

            } else {
              res = '-'
            }

            return res;
          }
        }, {
          data: 'sapJsonSuccess', className: 'text-center',
          render(data, type, row, meta) {
            let res
            if (null != data) {
              let res1 = JSON.parse(data);
              res = res1.docno
              console.log(res.docno);
            } else {
              res = '-'
            }
            return res;
          }
        }, {
          data: 'sapJsonFail', className: 'text-center',
          render(data, type, row, meta) {
            let res
            if (null != data) {
              res = MessageService.SAP.getMsgErr(data);
            } else {
              res = '-'
            }
            console.log(res);
            return res;
          }
        }, {
          data: 'dateTime', className: 'text-center',
          render(data, type, row, meta) {
            let res = moment(new Date(data)).format("MMMM Do YYYY, h:mm:ss a").toString()

            return res;
          }
        }, {
          className: 'text-center',
          render(data, type, row, meta) {
            let button = '<button-icon class="btn btn-sm btn-info" ><i class="fa fa-search" aria-hidden="true"></i></button-icon>';
            return button;
          }
        },
      ],
    });

    this.dataTable.on('click', 'td > button-icon.btn-info', (event) => {
      const data = this.dataTable.row($(event.currentTarget).closest('tr')).data();
      //console.log(data);
      this.router.navigate(['user/sapJsonDetail'], {
        queryParams: {
          id: data.id
        }
      });
    });
  }

}
