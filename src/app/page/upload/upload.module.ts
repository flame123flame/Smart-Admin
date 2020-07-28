import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PipeModule } from 'src/app/common/pipes/pipe.module';

import { UploadRoutingModule } from './upload-routing.module';
import { Upload001Component } from './upload001/upload001.component';

@NgModule({
  declarations: [Upload001Component],
  imports: [
    CommonModule,
    UploadRoutingModule,
    ComponentsModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    PipeModule,
  ]
})
export class UploadModule { }
