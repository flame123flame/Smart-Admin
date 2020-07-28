import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'modal-alert',
  templateUrl: './modalAlert.component.html',
  styleUrls: ['./modalAlert.component.css']
})
export class ModalAlertComponent implements OnInit {
  @ViewChild('modalalert') mymodal: ElementRef;
  public modalRef: BsModalRef;

  @Input() header = 'แจ้งเตือน !';
  @Input() body = 'มีการแจ้งเตือน';

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  constructor(private modalService: BsModalService) { }


  ngOnInit() {
    // console.log("header : ", this.header);
  }

  openModal() {
    this.modalRef = this.modalService.show(this.mymodal);
  }
  onClick(key) {
    this.modalRef.hide();
    switch (key) {
      case 'close':
        this.onClose.emit();
        break;
    }
  }
}
