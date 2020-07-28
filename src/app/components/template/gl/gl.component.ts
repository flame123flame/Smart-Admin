import { Component, OnInit, Input } from '@angular/core';
import { AjaxService } from 'src/app/_service/ajax.service';
import { ResponseData } from 'src/app/common/models/response-data.model';
import { FormArray } from '@angular/forms';
import { Utils } from 'src/app/common/helper';

const URL = {
  save: "gl/save",
  saveAction: "gl/save-action",
  get: "gl/get",
  getMaster: "common/getGlAccount",
  GET_DROPDOWN_LOV: "lov/list-data-detail",
  GET_DROPDOWN_TEXT_CODE: "tax-code/list",
  GET_DROPDOWN_WT_CODE: "wt-tax/list"
};

@Component({
  selector: 'app-gl',
  templateUrl: './gl.component.html',
  styleUrls: ['./gl.component.css']
})

export class GLComponent implements OnInit {
  glList: any[] = [];
  @Input() moduleCode: string = '';
  public data: any = {
    glAccount: ""
    , glAccountDesc: ""
    , taxCode: ""
    , text: ""
    // , withholdingCode: ""
    // , withholdingType: ""    
    , specialGl: ""
    , paMain: ""
    , paService: ""
    , reqId: ""
    , moduleCode: ""
    , glAction: null

  };

  public glAction: any = [{
    actionId: ""
    , actionCode: "Request"
    , actionName: "ขอใช้บริการ"
    , taxCode: ""
    , specialGl: ""
    , text: ""
    , manageId: ""
    , glTaxCode: ""
    , withholdingCode: ""
    , withholdingType: ""
  },
  {
    actionId: ""
    , actionCode: "Cancel"
    , actionName: "ขอยกเลิกบริการ"
    , taxCode: ""
    , text: ""
    , specialGl: ""
    , manageId: ""
    , glTaxCode: ""
    , withholdingCode: "N/A"
    , withholdingType: "N/A"
  },
  {
    actionId: ""
    , actionCode: "Monthly"
    , actionName: "บริการรายเดือน"
    , taxCode: ""
    , text: ""
    , specialGl: ""
    , manageId: ""
    , glTaxCode: ""
    , withholdingCode: ""
    , withholdingType: ""
  },
  {
    actionId: ""
    , actionCode: "Cash"
    , actionName: "เงินสด"
    , taxCode: ""
    , text: ""
    , specialGl: ""
    , manageId: ""
    , glTaxCode: ""
    , withholdingCode: ""
    , withholdingType: ""
  }];
  public glAccountList: any = [];
  public lovListA1: any = [];
  public lovListR1: any = [];
  public withholdingCode01: any = [];
  public withholdingCode02: any = [];
  public withholdingCode03: any = [];

  public textCodeList: any = [];
  constructor(private ajax: AjaxService) {
  }

  ngOnInit() {

    this.getGlAccount();
    this.getTrashPaymentTypeA1();
    this.getTrashPaymentTypeR1();
    this.getTrashtaxcode();

  }

  getGlAccount() {
    this.ajax.doPost(URL.getMaster, {}).subscribe((res: ResponseData<any>) => {
      this.glAccountList = res.data;
      // console.log("glAccountList :",this.glAccountList);
    });
  }



  getVal(reqId, moduleCode) {
    this.ajax.doPost(URL.get, { reqId: reqId, moduleCode: moduleCode }).subscribe((res: ResponseData<any>) => {
      console.log("res.data", res.data);
      if (res.data) {
        this.data.glAccount = res.data.glAccount;
        this.data.taxCode = res.data.taxCode;
        // this.data.withholdingCode = res.data.withholdingCode;
        this.data.specialGl = res.data.specialGl;
        this.data.text = res.data.text;
        this.data.paMain = res.data.paMain;
        this.data.paService = res.data.paService;
        this.data.reqId = res.data.reqId;
        this.data.moduleCode = res.data.moduleCode;
        this.data.glAccountDesc = res.data.glAccountDesc;
        this.glList = res.data.glAction
        if (this.glList != null) {
          if (this.glList.length != 0) {
        setTimeout(() => {
            this.glAction[0].actionId = this.glList[0].actionId;
            this.glAction[1].actionId = this.glList[1].actionId;
            this.glAction[2].actionId = this.glList[2].actionId;
            this.glAction[3].actionId = this.glList[3].actionId;

            this.glAction[0].specialGl = this.glList[0].specialGl;
            this.glAction[1].specialGl = this.glList[1].specialGl;
            this.glAction[2].specialGl = this.glList[2].specialGl;
            this.glAction[3].specialGl = this.glList[3].specialGl;

            this.glAction[0].taxCode = this.glList[0].taxCode;
            this.glAction[1].taxCode = this.glList[1].taxCode;
            this.glAction[2].taxCode = this.glList[2].taxCode;
            this.glAction[3].taxCode = this.glList[3].taxCode;

            this.glAction[0].text = this.glList[0].text;
            this.glAction[1].text = this.glList[1].text;
            this.glAction[2].text = this.glList[2].text;
            this.glAction[3].text = this.glList[3].text;


            this.glAction[0].glTaxCode = this.glList[0].glTaxCode;
            this.glAction[1].glTaxCode = this.glList[1].glTaxCode;
            this.glAction[2].glTaxCode = this.glList[2].glTaxCode;
            this.glAction[3].glTaxCode = this.glList[3].glTaxCode;

            this.glAction[0].withholdingCode = this.glList[0].withholdingCode;
            this.glAction[1].withholdingCode = this.glList[1].withholdingCode;
            this.glAction[2].withholdingCode = this.glList[2].withholdingCode;
            this.glAction[3].withholdingCode = this.glList[3].withholdingCode;


            this.glAction[0].withholdingType = this.glList[0].withholdingType;
            this.glAction[1].withholdingType = this.glList[1].withholdingType;
            this.glAction[2].withholdingType = this.glList[2].withholdingType;
            this.glAction[3].withholdingType = this.glList[3].withholdingType;
            // console.log("glList :", this.glList[0].withholdingCode);
            // console.log("this.glAction[2].withholdingCode :", this.glList[0].withholdingCode);
          }, 1000);
          }
        }
      }
    });
  }
  save(reqId, moduleCode) {
    this.data.reqId = reqId;
    this.data.moduleCode = moduleCode;
    this.data.glAction = this.glAction
    console.log(this.data);

    this.ajax.doPost(URL.save, this.data).subscribe((res: ResponseData<any>) => {

    });
  }
  callGlAccount(val) {
    var globj = this.glAccountList.filter(function (valfil) {
      return valfil.value === val;
    });

    this.data.glAccountDesc = globj[0].label;

  }

  getTrashtaxcode() {
    this.ajax
      .doPost(URL.GET_DROPDOWN_TEXT_CODE, {})
      .subscribe((res: ResponseData<any>) => {
        let data = {
          description: "N/A",
          glDescription: "N/A",
          glTaxCode: "N/A",
          persen: "N/A",
          taxCode: "N/A",
          taxCodeId: null
        }
        res.data.unshift(data)
        this.textCodeList = res.data;

      });
  }
  getTrashPaymentTypeA1() {
    this.ajax
      .doPost(URL.GET_DROPDOWN_WT_CODE,"A1")
      .subscribe((res: ResponseData<any>) => {
        let data = {
          withholdingCode: "N/A",
          withholdingCodeDes: "N/A",
          withholdingTaxId: null,
          withholdingType: null,
          withholdingTypeDes: ""
        }
        res.data.unshift(data)
        this.lovListA1 = res.data;
      });
  }
  getTrashPaymentTypeR1() {
    this.ajax
      .doPost(URL.GET_DROPDOWN_WT_CODE,"R1")
      .subscribe((res: ResponseData<any>) => {
        let data = {
          withholdingCode: "N/A",
          withholdingCodeDes: "N/A",
          withholdingTaxId: null,
          withholdingType: null,
          withholdingTypeDes: ""
        }
        res.data.unshift(data)
        this.lovListR1 = res.data;
      });
  }
  callTextCode01(e) {
    if (e.target.value == 0) {
      this.glAction[0].glTaxCode = null;
      this.glAction[0].glTaxCode = null;
      return "";
    }
    var textCodeListNew = this.textCodeList.filter(function (valfil) {
      return valfil.taxCode === e.target.value;
    });

    this.glAction[0].taxCode = textCodeListNew[0].taxCode;
    this.glAction[0].glTaxCode = textCodeListNew[0].glTaxCode;

  }
  callTextCode02(e) {
    if (e.target.value == 0) {
      this.glAction[1].glTaxCode = null;
      this.glAction[1].glTaxCode = null;
      return "";
    }
    var textCodeListNew = this.textCodeList.filter(function (valfil) {
      return valfil.taxCode === e.target.value;
    });
    this.glAction[1].taxCode = textCodeListNew[0].taxCode;
    this.glAction[1].glTaxCode = textCodeListNew[0].glTaxCode;

  }
  callTextCode03(e) {
    console.log("e.target.value", e.target.value);
    if (e.target.value == 0) {
      this.glAction[2].glTaxCode = null;
      this.glAction[2].glTaxCode = null;
      return "";
    }
    var textCodeListNew = this.textCodeList.filter(function (valfil) {
      return valfil.taxCode === e.target.value;
    });
    // this.data.taxCode = textCodeListNew[0].taxCode;

    this.glAction[2].glTaxCode = textCodeListNew[0].glTaxCode;
    this.glAction[2].taxCode = textCodeListNew[0].taxCode;
  }

  callTextCode04(e) {
    console.log("e.target.value", e.target.value);
    if (e.target.value == 0) {
      this.glAction[3].glTaxCode = null;
      this.glAction[3].glTaxCode = null;
      return "";
    }
    var textCodeListNew = this.textCodeList.filter(function (valfil) {
      return valfil.taxCode === e.target.value;
    });
  

    this.glAction[3].glTaxCode = textCodeListNew[0].glTaxCode;
    this.glAction[3].taxCode = textCodeListNew[0].taxCode;
  }

  callTextCode01A1(e) {
 
    var textCodeListNew = this.lovListA1.filter(function (valfil) {
      return valfil.withholdingCode === e.target.value;
    });

    this.glAction[0].withholdingCode = textCodeListNew[0].withholdingCode;
    this.glAction[0].withholdingType = textCodeListNew[0].withholdingType;

  }
  callTextCode01A2(e) {

    var textCodeListNew = this.lovListA1.filter(function (valfil) {
      return valfil.withholdingCode === e.target.value;
    });
    
    this.glAction[3].withholdingCode = textCodeListNew[0].withholdingCode;
    this.glAction[3].withholdingType = textCodeListNew[0].withholdingType;

  }
  callTextCode01R1(e) { 
  
    
    var textCodeListNew = this.lovListR1.filter(function (valfil) {
      return valfil.withholdingCode === e.target.value;
    });
    console.log("callTextCode01R1",textCodeListNew);

    this.glAction[2].withholdingCode = textCodeListNew[0].withholdingCode;
    this.glAction[2].withholdingType = textCodeListNew[0].withholdingType;

  }


}