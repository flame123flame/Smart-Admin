import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AjaxService } from 'src/app/_service/ajax.service';
import { MessageService } from 'src/app/_service/message.service';
import { ResponseData } from 'src/app/common/models/response-data.model';

const URL = {
  SAVE: "electric010/save",
  FIND_DATA: "electric010/getTou"
}

declare var $: any;
@Component({
  selector: 'modal-tou-input',
  templateUrl: './touinput.component.html',
  styleUrls: ['./touinput.component.css']
})
export class TouinputComponent implements OnInit {
  @ViewChild('modalTou') mymodal: ElementRef;
  public modalRef: BsModalRef;

  mainHeader: string = 'ยืนยัน';
  @Input() body: string = 'ยืนยันการทำรายการ';

  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() onConfirm: EventEmitter<any> = new EventEmitter();
  public data = {
    idReq: 0,
    kw161: 0,
    kw162: 0,
    kw163: 0,
    kwh180: 0,
    kwh181: 0,
    kwh182: 0,
    kwh183: 0,
    kvar361: 0,
    kvar362: 0,
    kvar363: 0,
    periodMonth: ""
  }
  ngbModalOptions: any;
  header: string = "";
  constructor(private modalService: BsModalService
    , private ajax: AjaxService) {
    this.ngbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-md'
    };
  }
  ngOnInit() {
    console.log("header : ", this.header);

  }

  openModal(header: string, idReq: number, periodMonth: string) {
    this.header = header;
    this.data.idReq = idReq;
    this.data.periodMonth = periodMonth;
    this.modalRef = this.modalService.show(this.mymodal, this.ngbModalOptions);
    this.ajax.doPost(URL.FIND_DATA, this.data).subscribe((response: ResponseData<any>) => {
      if (MessageService.MSG.SUCCESS === response.status) {
        console.log("response : ", response.data);
        this.data.kw161 = response.data.kw161
        this.data.kw162 = response.data.kw162
        this.data.kw163 = response.data.kw163
        this.data.kwh180 = response.data.kwh180
        this.data.kwh181 = response.data.kwh181
        this.data.kwh182 = response.data.kwh182
        this.data.kwh183 = response.data.kwh183
        this.data.kvar361 = response.data.kvar361
        this.data.kvar362 = response.data.kvar362
        this.data.kvar363 = response.data.kvar363
      } else {
        // this.onClick('close');
      }
    });
  }

  onClickSave() {
    this.ajax.doPost(URL.SAVE, this.data).subscribe((response: ResponseData<any>) => {
      if (MessageService.MSG.SUCCESS === response.status) {
        this.onClick('close');
      } else {
        // this.onClick('close');
      }
    });
  }
  onClick(key) {
    this.modalRef.hide();
    switch (key) {
      case 'confirm':
        this.onConfirm.emit();
        break;
      case 'close':
        this.onClose.emit();
        this.data = {
          idReq: 0,
          kw161: 0,
          kw162: 0,
          kw163: 0,
          kwh180: 0,
          kwh181: 0,
          kwh182: 0,
          kwh183: 0,
          kvar361: 0,
          kvar362: 0,
          kvar363: 0,
          periodMonth: ""
        }
        break;
      default:
        break;
    }
  }

}

