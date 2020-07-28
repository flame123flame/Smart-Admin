import { Injectable } from '@angular/core';
import { SAP_CONSTANT } from '../common/constant/SAP.Constant';
import { ButtonDatatable } from '../components/buttons/button-datatable';

@Injectable()
export class MessageService {
  public static MSG = {
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
    DUPLICATE_DATA: 'DUPLICATE_DATA',
    FAILED_CALLBACK: 'กรุณาติดต่อผู้ดูแลระบบ',
    DATA_UNCHECKED: 'กรุณาเลือกข้อมูล',
    REQUIRE_FIELD: 'กรุณากรอกข้อมูลให้ถูกต้อง'
  };

  public static SAP = {
    getMsgErr(sapErrorJSON: any): String {
      let msgErr: string = "";
      let count: number = 0;
      if (sapErrorJSON) {
        let sapError = JSON.parse(sapErrorJSON);
        console.log("sapError : ", sapError);
        if (Array.isArray(sapError.return.detailreturn.item)) {
          console.log("ARRAY");

          sapError.return.detailreturn.item.forEach(item => {
            if (SAP_CONSTANT.STATUS.FAIL.TYPE === item.type) {
              if (count == 0) {
                msgErr = `${item.message}`;
              } else {
                msgErr = `${msgErr} , ${item.message}`;
              }
              count++;
            }
          });
        } else {
          console.log("OBJ");
          let itemList = sapError.return.detailreturn.item;
          if (SAP_CONSTANT.STATUS.FAIL.TYPE === itemList.type) {
            msgErr = `${itemList.message}`;
            console.log("msgErr : ", msgErr);
          }
        }
      }
      return msgErr;
    },
    getStatus(sapStatus: string, id: string = "sapMsgErr"): String {
      let status: string = '';
      switch (sapStatus) {
        case SAP_CONSTANT.STATUS.CONNECTION_FAIL.CONST:
          status = `
          <span class="text-danger">${SAP_CONSTANT.STATUS.CONNECTION_FAIL.DESC}</span>
            `;
          break;
        case SAP_CONSTANT.STATUS.FAIL.CONST:
          status = `
          <span class="text-danger">${SAP_CONSTANT.STATUS.FAIL.DESC}</span>
          ${ButtonDatatable.detail(id)}`;
          break;
        case SAP_CONSTANT.STATUS.SUCCESS.CONST:
          status = `<span class="text-success">${SAP_CONSTANT.STATUS.SUCCESS.DESC}</span>`;
          break;
        case SAP_CONSTANT.STATUS.MIGRAT.CONST:
          status = `<span class="text-success">${SAP_CONSTANT.STATUS.MIGRAT.DESC}</span>`;
          break;
        default:
          status = `<span class="text-warning">${SAP_CONSTANT.STATUS.PENDING.DESC}</span>`;
          break;
      }
      return status;
    }
  }
}
