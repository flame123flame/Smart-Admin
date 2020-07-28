import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnBoardingRoutingModule } from './on-boarding-routing.module';
import { OnBoarding001Component } from './on-boarding001/on-boarding001.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PipeModule } from 'src/app/common/pipes/pipe.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [OnBoarding001Component],
  imports: [
    CommonModule,
    ComponentsModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    OnBoardingRoutingModule,
    PipeModule,
    TooltipModule.forRoot()
  ]
})
export class OnBoardingModule { }
