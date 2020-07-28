import { Component, OnInit } from '@angular/core';
import { AjaxService } from 'src/app/_service/ajax.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/_service/ common.service';
import { ResponseData } from 'src/app/common/models/response-data.model';
import { MessageService } from 'src/app/_service/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DateStringPipe } from 'src/app/common/pipes/date-string.pipe';
import { Utils } from 'src/app/common/helper';
const URL = {
  LIST: "sap/Detail",
}
@Component({
  selector: 'app-sap-json-detail',
  templateUrl: './sap-json-detail.component.html',
  styleUrls: ['./sap-json-detail.component.css']
})
export class SapJsonDetailComponent implements OnInit {
  id: any;
  data: any;
  json: any;
  success: any;
  fail: any;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private ajax: AjaxService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.queryParams['id'] || "";
    console.log(this.id);
    this.getDetail(this.id);
  }

  getDetail(id) {
    this.commonService.loading();
    this.ajax.doPost(URL.LIST, { id: id }).subscribe((res: ResponseData<any>) => {
      //console.log("this.dataList : ",res.data);
      this.data = res.data;

      this.json = this.syntaxHighlight(this.data.sapJson);
      this.success = this.syntaxHighlight(this.data.sapJsonSuccess);
      this.fail = this.syntaxHighlight(this.data.sapJsonFail == null ? "-" : this.data.sapJsonFail);
      console.log("this.dataList : ", this.data);
      this.commonService.unLoading();
    });
  }

  syntaxHighlight(json) {
    if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return match;
    });
  }

}
