import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/common/helper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-setting001',
  templateUrl: './setting001.component.html',
  styleUrls: ['./setting001.component.css']
})
export class Setting001Component implements OnInit {
  tabIdx: number = 1;
  colorMenu01: any = '#f4f4f4';
  colorMenu02: any = '#f4f4f4';
  colorMenu03: any = '#f4f4f4';
  colorMenu04: any = '#f4f4f4';
  hightMenu: any = "105px";
  constructor(
    private route: ActivatedRoute
  ) { }
  breadcrumb: any = [
    {
      label: "การตั้งค่า",
      link: "/home/settings",
    },
    {
      label: "ปรับปรุงอัตราค่าภาระ ค่าบริการไฟฟ้า",
      link: "#",
    }
  ];
  ngOnInit() {
    if (Utils.isNotNull(this.route.snapshot.queryParams['tab'])) {
      this.ChaneColor(this.route.snapshot.queryParams['tab']);
    }
  }

  ChaneColor(e) {
    this.tabIdx = e;
    if (e == '1') {
      this.colorMenu01 = '#D3D3D3'
      this.colorMenu02 = '#f4f4f4'
      this.colorMenu03 = '#f4f4f4'
      this.colorMenu04 = '#f4f4f4'
    } else if (e == '2') {
      this.colorMenu01 = '#f4f4f4'
      this.colorMenu02 = '#D3D3D3'
      this.colorMenu03 = '#f4f4f4'
      this.colorMenu04 = '#f4f4f4'
    } else if (e == '3') {
      this.colorMenu01 = '#f4f4f4'
      this.colorMenu02 = '#f4f4f4'
      this.colorMenu03 = '#D3D3D3'
      this.colorMenu04 = '#f4f4f4'
    } else if (e == '4') {
      this.colorMenu01 = '#f4f4f4'
      this.colorMenu02 = '#f4f4f4'
      this.colorMenu03 = '#f4f4f4'
      this.colorMenu04 = '#D3D3D3'
    }
  }
}
