import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output, AfterViewInit, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ValidateService } from 'src/app/_service/validate.service';
import { CommonService } from 'src/app/_service/ common.service';
import { AjaxService } from 'src/app/_service/ajax.service';
import { ModalSuccessComponent } from 'src/app/components/modal/modal-success/modalSuccess.component';
import { ModalErrorComponent } from 'src/app/components/modal/modal-error/modalError.component';
import { MessageService } from 'src/app/_service/message.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalConfirmComponent } from 'src/app/components/modal/modal-confirm/modalConfirm.component';
import { ResponseData } from 'src/app/common/models/response-data.model';

declare var $: any;
const URLS = {
  UPLOAD: 'common/uploadRicFile',
  DOWNLOAD: 'common/downloadRicFile',
  GET_FILE_LIST: 'common/getRicListFile',
  DELETE_FILE: 'common/deleteRicListFile'
};
@Component({
  selector: 'modal-uploadFile',
  templateUrl: './uploadFile.component.html',
  styleUrls: ['./uploadFile.component.css']
})
export class UploadFileComponent implements AfterViewInit, OnDestroy, OnInit {
  public modalRef: BsModalRef;
  @ViewChild('successModal') successModal: ModalSuccessComponent;
  @ViewChild('errorModal') modalError: ModalErrorComponent;
  @ViewChild('deleteFileModal') deleteFileModal: ModalConfirmComponent;
  @ViewChild('modalUpload') mymodal: ElementRef;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  public transactionNo: string = '';
  public reqPage: string = '';
  public reqFileId = "";
  public dtOptions: DataTables.Settings = null;
  public dtTrigger: Subject<any> = new Subject();
  public itemList: any = [];

  constructor(private validate: ValidateService
    , private commonService: CommonService
    , private ajax: AjaxService
    , private modalService: BsModalService) {

    this.dtOptions = this.commonService.configDataTable();
  }
  ngOnInit() {


  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  openModal(transactionNo: string, page: string) {
    if (this.modalRef) {
      this.modalRef.hide();
    }

    this.transactionNo = transactionNo;
    this.reqPage = page
    this.modalRef = this.modalService.show(this.mymodal, { class: 'modal-xl' });
    this.getFileList();

  }

  closeModal() {
    this.modalRef.hide();
  }
  onUpload = (event: any) => {
    const validateData = [
      { format: '', header: 'File', value: $('#file').val() }
    ];
    if (this.validate.checking(validateData)) {
      if ($('#file').val() == '') {
        return;
      } else {
        event.preventDefault();
        const form = $('#upload-form')[0];
        const formBody = new FormData(form);
        formBody.append('transactionNo', this.transactionNo);
        formBody.append('category', this.reqPage);

        // call uploadFile
        this.uploadFile(formBody);
      }
    }
  }
  uploadFile(formBody: any) {
    this.commonService.loading();
    this.ajax.upload(URLS.UPLOAD, formBody, res => {
      if (MessageService.MSG.SUCCESS === res.json().status) {
        this.successModal.openModal();
        this.getFileList();
        $('#file').val('');
      } else {
        this.modalError.openModal('ไม่สามารถอัพโหลดไฟล์ได้');
      }
      this.commonService.unLoading();
    });
  }
  getFileList() {
    let req = {
      transactionNo: this.transactionNo,
      reqPage: this.reqPage
    };
    this.ajax.doPost(URLS.GET_FILE_LIST, req).subscribe(
      (res: ResponseData<any>) => {
        this.itemList = res.data;
        this.rerender()
      },
      (err) => {
        this.commonService.unLoading();
      }
    );

  }
  rerender(): void {
    if (this.dtElement) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }
  }
  downloadFile(fileId) {
    window.open(AjaxService.CONTEXT_PATH + URLS.DOWNLOAD + '/' + fileId, "_blank");
  }

  openModal2(reqFileId) {
    this.reqFileId = reqFileId;
    this.deleteFileModal.openModal();
  }

  onClickDeleteFile() {
    this.deleteFile(this.reqFileId);
  }
  deleteFile(reqFileId) {
    this.commonService.loading();
    let req = {
      reqFileId: reqFileId,
      transactionNo: this.transactionNo,
      reqPage: this.reqPage
    };
    console.log("ddddddddddd");

    this.ajax.doPost(URLS.DELETE_FILE, req).subscribe((res: ResponseData<any>) => {
      if (MessageService.MSG.SUCCESS === res.status) {
        this.successModal.openModal();
        this.getFileList();
      } else {
        this.modalError.openModal(MessageService.MSG.FAILED_CALLBACK);
      }
      this.commonService.unLoading();
    });
  }
}