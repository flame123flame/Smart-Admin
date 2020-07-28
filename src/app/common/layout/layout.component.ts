import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/_service/ common.service';
import { UserService } from 'src/app/_service/user.service.';
import { User } from 'src/app/_model/user';
import { Setting } from 'src/app/_setting/setting';
import { TimeSpan } from '../models/time-span-on-boarding.model';
import { interval } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {
  alertSuccess: boolean = false;
  alertDanger: boolean = false;
  checkrouting: boolean = true;
  authorities: any = null;
  colorMenu01: any = '#707070';
  colorMenu02: any = '#707070';
  colorMenu03: any = '#707070';
  colorMenu04: any = '#707070';
  colorMenu06: any = '#707070';
  user: User = null;
  date: any;
  date2: any;
  date5: any;
  dataplut: any;
  totalSeconds: any;
  totalSeconds1: any;
  totalSeconds2: any;
  totalSeconds3: any;
  hoursFix: any;

  minutesFix: any;
  secondsFix: any;
  public role: any = null;
  public path: any = null;
  timer: string;
  dataTimercount1: any[];
  dataTimercount2: any[];
  dataTimer: any[];
  dataTimer2: any[];
  colorMenu05: any = '#707070';
  action: any;
  constructor(
    private router: Router,
    private common: CommonService,
    public userSV: UserService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.user = new User;
    this.user.fullName = this.userSV.currentUserValue.fullName;
    this.user.token = this.userSV.currentUserValue.token;
    this.user.organizeCode = this.userSV.currentUserValue.organizeCode;
    this.user.organizeDesc = this.userSV.currentUserValue.organizeDesc;
    this.user.authorities = this.userSV.currentUserValue.authorities;
    this.user.username = this.userSV.currentUserValue.username;

    this.role = Setting.ROLE;
    this.path = Setting.PATH;


  }


  ngOnInit() {
    this.getStartTime();
    localStorage.setItem('time2', localStorage.getItem('time'));
    this.dataTimer2 = localStorage.getItem('time2').split('.');
    this.dataplut = Number(this.dataTimer2[2])
    let POS_AUT = this.userSV.POS_ROLE;
    if (this.user.authorities['POS_CON']) {
      this.checkrouting = false;
    } else {
      this.checkrouting = true;
    }


    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(".dataTables_scrollHeadInner").css({ "width": "100%" });
        $(".table ").css({ "width": "100%" });
      });
    });
  }
  ChaneColor(e) {
    if (e == '0') {
      this.colorMenu01 = '#FF5454'
      this.colorMenu02 = '#707070'
      this.colorMenu03 = '#707070'
      this.colorMenu04 = '#707070'
      this.colorMenu05 = '#707070'
      this.colorMenu06 = '#707070'
    } else if (e == '1') {
      this.colorMenu01 = '#707070'
      this.colorMenu02 = '#FF5454'
      this.colorMenu03 = '#707070'
      this.colorMenu04 = '#707070'
      this.colorMenu05 = '#707070'
      this.colorMenu06 = '#707070'
    } else if (e == '2') {
      this.colorMenu01 = '#707070'
      this.colorMenu02 = '#707070'
      this.colorMenu03 = '#FF5454'
      this.colorMenu04 = '#707070'
      this.colorMenu05 = '#707070'
      this.colorMenu06 = '#707070'
    } else if (e == '3') {
      this.colorMenu01 = '#707070'
      this.colorMenu02 = '#707070'
      this.colorMenu03 = '#707070'
      this.colorMenu04 = '#FF5454'
      this.colorMenu05 = '#707070'
      this.colorMenu06 = '#707070'
    }
    else if (e == '4') {
      this.colorMenu01 = '#707070'
      this.colorMenu02 = '#707070'
      this.colorMenu03 = '#707070'
      this.colorMenu04 = '#707070'
      this.colorMenu05 = '#FF5454'
      this.colorMenu06 = '#707070'
    } else if (e == '5') {
      this.colorMenu01 = '#707070'
      this.colorMenu02 = '#707070'
      this.colorMenu03 = '#707070'
      this.colorMenu04 = '#707070'
      this.colorMenu05 = '#707070'
      this.colorMenu06 = '#FF5454'
    }

  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  otherClick() {
    $(document).ready(function () {
      $('#sidebar').addClass('active');
      $(".dataTables_scrollHeadInner").css({ "width": "100%" });
      $(".table ").css({ "width": "100%" });
    });
  }

  scrollToTop() {
    window.scroll(0, 0);
  }

  toTop() {
  }

  getStartTime() {
    this.date = new Date().getTime();
    interval(1000).subscribe(() => {
      this.changeDetector.detectChanges();
    });
  }


  getElapsedTime(id: any): TimeSpan {
    if (isNaN(this.dataplut)) {
      this.totalSeconds3 = Math.floor((new Date().getTime() - this.date) / 1000);
      let hours = 0;
      let minutes = 0;
      let seconds = 0;
      if (this.totalSeconds3 >= 3600) {
        hours = Math.floor(this.totalSeconds3 / 3600);
        this.totalSeconds3 -= 3600 * hours;
      }
      if (this.totalSeconds3 >= 60) {
        minutes = Math.floor(this.totalSeconds3 / 60);
        this.totalSeconds3 -= 60 * minutes;
      }
      if (this.totalSeconds3 <= 59) {
        seconds = Math.floor(this.totalSeconds3);
        this.totalSeconds3 -= 1 * minutes;
      }
      var num01 = hours;
      this.hoursFix = Number(num01.toFixed(2));
      var num02 = minutes;
      this.minutesFix = Number(num02.toFixed(2));
      var num03 = seconds;
      this.secondsFix = Number(num03.toFixed(2));
      localStorage.setItem('time', this.hoursFix + "." + this.minutesFix + "." + this.secondsFix);
      this.timer = localStorage.getItem('time');
    }
    if (localStorage.getItem('time') != "0.0.NaN") {
      localStorage.setItem('time2', localStorage.getItem('time'));
      this.dataTimer2 = localStorage.getItem('time2').split('.');
      let hours = Number(this.dataTimer2[0]);
      let minutes = Number(this.dataTimer2[1]);
      let seconds = Number(this.dataTimer2[2]);
      var datarr;
      var datarr3
      datarr = seconds
      datarr3 = Math.floor((new Date().getTime() - this.date) / 1000) + this.dataplut
      this.totalSeconds1 = datarr3;
      if (this.totalSeconds1 >= 3600) {
        hours = Math.floor(this.totalSeconds1 / 3600);
        this.totalSeconds1 -= 3600 * hours;
      }
      if (this.totalSeconds1 >= 60) {
        minutes = Math.floor(this.totalSeconds1 / 60);
        this.totalSeconds1 -= 60 * minutes;
      }
      if (this.totalSeconds1 <= 59) {
        seconds = Math.floor(this.totalSeconds1);
        this.totalSeconds1 -= 1 * minutes;
      }
      var num01 = hours;
      this.hoursFix = Number(num01.toFixed(2));
      var num02 = minutes;
      this.minutesFix = Number(num02.toFixed(2));
      var num03 = seconds;
      this.secondsFix = Number(num03.toFixed(2));
      localStorage.setItem('time', this.hoursFix + "." + this.minutesFix + "." + this.secondsFix);
      this.timer = localStorage.getItem('time');
      return {
        hours: this.hoursFix,
        minutes: this.minutesFix,
        seconds: this.secondsFix
      };
    }
  }

  logout() {
    localStorage.clear();
  }
}
