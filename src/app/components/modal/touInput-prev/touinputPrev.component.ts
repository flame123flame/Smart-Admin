import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AjaxService } from 'src/app/_service/ajax.service';
import { MessageService } from 'src/app/_service/message.service';
import { ResponseData } from 'src/app/common/models/response-data.model';

const URL = {
  SAVE: "electric010/saveBackwardMeterValue"
}

declare var $: any;
@Component({
  selector: 'modal-tou-prev-input',
  templateUrl: './touinputPrev.component.html',
  styleUrls: ['./touinputPrev.component.css']
})
export class TouinputPrevComponent implements OnInit {
  @ViewChild('modalTou') mymodal: ElementRef;
  public modalRef: BsModalRef;

  mainHeader: string = 'ยืนยัน';
  @Input() body: string = 'ยืนยันการทำรายการ';

  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() onConfirm: EventEmitter<any> = new EventEmitter();
  public data = {
    backwardMeterValue : 0,
    idReq : 0,
    kw161 : 0,
    kw162 : 0,
    kw163 : 0,
    kwh180 : 0,
    kwh181 : 0,
    kwh182 : 0,
    kwh183 : 0,
    kvar361 : 0,
    kvar362 : 0,
    kvar363 : 0,
    periodMonth: ""}
  ngbModalOptions: any;
  header : string = "";
  constructor(private modalService: BsModalService
            , private ajax: AjaxService) { 
  this.ngbModalOptions = {
                backdrop : 'static',
                keyboard : false,
                class: 'modal-md'
          };
  }
  ngOnInit() {
  }

  openModal(header:string, idReq:number , periodMonth:string ) {
    this.header = header;
    this.data.idReq = idReq;
    console.log("this.data.idReq"  ,  this.data.idReq);
    this.data.periodMonth = periodMonth;
    this.modalRef = this.modalService.show(this.mymodal, this.ngbModalOptions);
  }

  onClickSave(){
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
        break;
      default:
        break;
    }
  }

}

