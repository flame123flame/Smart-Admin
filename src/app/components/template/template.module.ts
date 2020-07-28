import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { GLComponent } from './gl/gl.component';
import { FormsModule } from '@angular/forms';
@NgModule({

  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    GLComponent,
  ],
  exports: [
    GLComponent,
  ],

})
export class TemplateModule { }
