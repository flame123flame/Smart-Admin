import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonService } from 'src/app/_service/ common.service';
import { AjaxService } from 'src/app/_service/ajax.service';
import { ResponseData } from 'src/app/common/models/response-data.model';
import { MessageService } from 'src/app/_service/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalConfirmComponent } from 'src/app/components/modal/modal-confirm/modalConfirm.component';
import { Utils } from 'src/app/common/helper/utils';
import { ModalErrorComponent } from 'src/app/components/modal/modal-error/modalError.component';
declare var $: any;
const URL = {
  SAVE: "users/save",
  GET_USER: "users/getUser",
  EDIT: "users/edit",
  GET_ALL: "users/get_all",
  GET_ALL_2: "users/get_all_edit",
  GET_DROPDOWN: "lov/list-data-detail"
}

@Component({
  selector: 'app-userDetail',
  templateUrl: './userDetail.component.html',
  styleUrls: ['./userDetail.component.css']
})
export class UserDetailComponent implements OnInit {
  validEmail: boolean = false
  formAddUser: FormGroup;
  submitted: Boolean = false;
  checkDataOn: Boolean = true;
  checkdataOut: Boolean = true;
  passwordTop: any;
  passwordMatch: boolean = false;
  @ViewChild('saveModal') modalSave: ModalConfirmComponent;
  @ViewChild('errorModal') modalError: ModalErrorComponent;

  id: any;
  username: any;
  dataUserEdit: any;
  buttomedit: boolean = true;
  roleList: any[] = [];
  roleList2: any[] = [];
  listCheck: any[] = [];
  roleId: number;
  airport: any;
  profit: any;
  test: any;
  dataDisablaIndex: any;
  action: any;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private ajax: AjaxService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formAddUser = this.formBuilder.group({
      userId: ["", Validators.required],
      userName: ["", Validators.required],
      password: ['', Validators.required],
      profitCenter: [''],
      confirmPass: ['', Validators.required],
      name: ["", Validators.required],
      surname: ["", Validators.required],
      airportCode: ["", Validators.required],
      airportDes: ["", Validators.required],
      email: ["", Validators.required],
      role: this.formBuilder.array([])
    })
  }
  breadcrumb: any = [
    {
      label: "ตั้งค่าผู้ใช้งาน",
      link: "/home",
    },
    {
      label: "ผู้เข้าใช้งาน",
      link: "/user/user",
    },
    {
      label: "เพิ่มผู้เข้าใช้งาน",
      link: "#",
    }
  ];
  ngOnInit() {
    this.getDropDawn();
    this.id = this.route.snapshot.queryParams['id'] || "";
    this.username = this.route.snapshot.queryParams['username'] || "";
    if (Utils.isNotNull(this.id)) {
      this.getUserDetail(this.id);
      this.buttomedit = false;
    } else {
      this.getRoleList();
    }
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    if (passwordKey !== passwordConfirmationKey) {
      this.modalError.openModal("รหัสผ่านต้องตรงกัน");
    }
    else {
      //     console.log("this.formAddUser.value : ", this.formAddUser.value);
      this.commonService.loading();
      this.profit.forEach((item, idx) => {
        if (item.descEn1 == this.formAddUser.value.airportCode) {
          this.formAddUser.patchValue({
            profitCenter: item.lovCode
          })
        }
      });
      this.ajax.doPost(URL.SAVE, this.formAddUser.value).subscribe((res: ResponseData<any>) => {
        if (MessageService.MSG.SUCCESS == res.status) {
          this.router.navigate(['user/user']);
        } else {
        }
        this.commonService.unLoading();
      });
    }
  }

  getDropDawn() {
    this.commonService.loading();
    this.ajax.doPost(`${URL.GET_DROPDOWN}`, { lovKey: "AIRPORT" }).subscribe((res: ResponseData<any>) => {
      this.airport = res.data;
      // this.commonService.unLoading();
    });
    this.ajax.doPost(`${URL.GET_DROPDOWN}`, { lovKey: "PROFIT_CENTER" }).subscribe((res: ResponseData<any>) => {
      this.profit = res.data;
      // console.log("profit", this.profit);
      this.commonService.unLoading();
    });
  }

  setAirport(e) {
    this.airport = this.airport.filter((data) => {
      return data.lovCode == e.target.value
    })
    this.formAddUser.patchValue({
      airportCode: this.airport[0].lovCode,
      airportDes: this.airport[0].descTh1
    })
    this.getDropDawn();
  }

  saveUser() {
    this.checkIfMatchingPasswords(this.formAddUser.value.password, this.formAddUser.value.confirmPass);
  }

  checkboxUser(item: any, event, index2: any) {
    // let index = this.listCheck.indexOf(item.roleCode);
    let index;
    for (let indexLoop = 0; indexLoop < this.listCheck.length; indexLoop++) {
      if (this.listCheck[indexLoop].role == item.roleCode) {
        index = indexLoop;
        break;
      }
    }
    this.dataDisablaIndex = index2;
    if (event.target.checked) {
      this.listCheck.push({ action: "", roleId: "", role: "", indexKey: index2 });
      document.getElementById("selectCourse" + this.dataDisablaIndex).removeAttribute('disabled');
    }
    else if (!event.target.checked) {
      document.getElementById("selectCourse" + this.dataDisablaIndex).setAttribute('disabled', 'true');
      this.listCheck.splice(index, 1);
    }
    this.formAddUser.setControl('role', this.formBuilder.array(this.listCheck));
  }

  onSelectCourse(e, index, item) {
    //   console.log("index", index);
    let role = item.roleCode
    let roleId = item.roleId
    // console.log("this.listCheck[index]", this.listCheck[index]);
    let idx: number = this.listCheck.findIndex(i => i.indexKey === index);
    // console.log("idx", idx)
    let newVal: any = this.listCheck[idx]
    newVal.role = item.roleCode;
    newVal.action = e.target.value;
    newVal.roleId = roleId
    this.listCheck[idx] = newVal;
    // this.listCheck[index] = {action:e.target.value,roleId:role ,role : roleId };
    // this.listCheck[index] = {... 'action':e.target.value, 'role' : roleId };
    //  console.log("new", this.listCheck[idx]);
    // console.log("new2 : ", this.listCheck);
    this.formAddUser.setControl('role', this.formBuilder.array(this.listCheck));
    document.getElementById("selectCourse" + index).removeAttribute('disabled');
  }

  checkboxAll(event) {
    if (event.target.checked) {
    }
    else if (!event.target.checked) {
      this.listCheck = [];
    }
  }

  checkdVal(item: any) {
    // console.log("this.listCheck : ",this.listCheck);
    const index = this.listCheck.findIndex(obj => obj.role === item.roleCode);
    // console.log("index : ",index);
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }

  onChange(newValue) {
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validEmailRegEx.test(newValue.target.value)) {
      this.validEmail = true;
    } else {
      this.validEmail = false;
    }
  }

  validateControlSave2(control: string) {
    return this.formAddUser.get(control).invalid && (this.formAddUser.get(control).touched || this.validEmail);
  }

  // ---------------------------------------------------------------------------- edit ---------------------------------------------------------------------------------

  getUserDetail(id: any) {
    let userId = id
    this.commonService.loading();
    this.ajax.doPost(URL.GET_USER, {
      "userId": userId
    }).subscribe((res: ResponseData<any>) => {
      if (MessageService.MSG.SUCCESS == res.status) {
        this.dataUserEdit = res.data.user;
        //  console.log("this.dataUserEdit :", this.dataUserEdit);
        this.setDatatoFormEdit();
        this.setDataRole(res.data.role);
      } else {
      }
      // this.commonService.unLoading();
    });
  }

  setDatatoFormEdit() {
    this.formAddUser.patchValue({
      userId: this.dataUserEdit.userId,
      userName: this.dataUserEdit.userName,
      name: this.dataUserEdit.name,
      surname: this.dataUserEdit.surname,
      email: this.dataUserEdit.email,
      airportCode: this.dataUserEdit.airportCode,
      airportDes: this.dataUserEdit.airportDes
    })
  }


  setDataRole(role: any) {
    //  console.log("role : ", role);
    this.listCheck = role.map(function (value) {
      let data = {
        action: value.action,
        role: value.roleCode,
        roleId: value.roleId,
        indexKey: value.indexKey
      }
      return data;
    });
    console.log(this.listCheck)
    this.formAddUser.value.role = this.listCheck
    console.log(this.formAddUser.value.role)

    this.getRoleList2();
  }


  edit() {
    //  console.log("this.formAddUser.value : ", this.formAddUser.value);

    this.commonService.loading();
    this.profit.forEach((item, idx) => {
      if (item.descEn1 == this.formAddUser.value.airportCode) {
        this.formAddUser.patchValue({
          profitCenter: item.lovCode
        })
      }
    });
    this.ajax.doPost(URL.EDIT, this.formAddUser.value).subscribe((res: ResponseData<any>) => {
      if (MessageService.MSG.SUCCESS == res.status) {
        this.router.navigate(['user/user']);
      } else {
      }
      this.commonService.unLoading();
    });
  }

  getRoleList() {
    this.commonService.loading();
    this.ajax.doGet(URL.GET_ALL).subscribe((res: ResponseData<any>) => {
      if (MessageService.MSG.SUCCESS == res.status) {
        this.roleList = res.data.sort(function (a, b) {
          return a.roleCode > b.roleCode ? 1 : -1
        })
      } else {
        this.modalError.openModal(res.message);
      }
      this.commonService.unLoading();
    })
  }

  getRoleList2() {
    this.commonService.loading();
    this.ajax.doGet(`${URL.GET_ALL_2}/${this.username}`).subscribe((res: ResponseData<any>) => {
      if (MessageService.MSG.SUCCESS == res.status) {
        this.roleList2 = res.data
        this.finddata();
      } else {
        this.modalError.openModal(res.message);
      }

    })
  }

  finddata() {
    this.roleList = this.roleList2.sort(function (a, b) {
      return a.roleCode > b.roleCode ? 1 : -1
    })
    this.commonService.unLoading();
  }


  createDetail(): FormGroup {
    return this.formBuilder.group({
      role: [""],
      action: [""]
    });
  }

  onBack() {
    this.router.navigate(["/settings/setting001"], {
      queryParams: {
        tab: 1
      }
    })
  }

}
