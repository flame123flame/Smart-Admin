import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { ComponentsModule } from 'src/app/components/components.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Setting001Component } from './setting001/setting001.component';
import { Setting001detailComponent } from './setting001detail/setting001detail.component';
import { UserModule } from '../usermanagement/user.module';
import { ConstantModule } from '../maincompanent/constant/constant.module';
import { LovModule } from '../maincompanent/lov/lov.module';



const routes: Routes = [
  { path: 'setting001', component: Setting001Component },
  { path: 'setting001detail', component: Setting001detailComponent },
];

@NgModule({
  declarations: [
    Setting001Component,
    Setting001detailComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    DataTablesModule,
    RouterModule.forChild(routes),
    BsDatepickerModule.forRoot(),
    UserModule,
    ConstantModule,
    LovModule
  ],
  exports: [RouterModule],
})
export class SettingsModule { }
