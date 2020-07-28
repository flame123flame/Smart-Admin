import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmComponent } from './modal-confirm/modalConfirm.component';
import { ButtonModule } from '..';
import { ModalAlertComponent } from './modal-alert/modalAlert.component';
import { ModalSuccessComponent } from './modal-success/modalSuccess.component';
import { ModalErrorComponent } from './modal-error/modalError.component';
import { ModalCustomComponent } from './modal-custom/modalCustom.component';
import { ModalComponent } from './modal-normal/modal.component';
import { ModalLookupComponent } from './modal-lookup/modalLookup.component';
import { DataTablesModule } from 'angular-datatables';
import { TouinputComponent } from './touInput/touinput.component';
import { DirectivesModule } from 'src/app/common/directives/directives.module';
import { FormsModule } from '@angular/forms';
import { UploadFileComponent } from './modal-Uploadfile/uploadFile.component';
import { TouinputPrevComponent } from './touInput-prev/touinputPrev.component';
@NgModule({
  declarations: [
    ModalComponent,
    ModalConfirmComponent,
    ModalAlertComponent,
    ModalSuccessComponent,
    ModalErrorComponent,
    ModalCustomComponent,
    ModalLookupComponent,
    TouinputComponent,
    TouinputPrevComponent,
    UploadFileComponent
  ],
  imports: [
    FormsModule
    , CommonModule
    , ButtonModule
    , DataTablesModule
    , DirectivesModule
  ],
  exports: [
    ModalComponent,
    ModalConfirmComponent,
    ModalAlertComponent,
    ModalSuccessComponent,
    ModalErrorComponent,
    ModalCustomComponent,
    ModalLookupComponent,
    TouinputComponent,
    TouinputPrevComponent,
    UploadFileComponent
  ]
})
export class ModalModule { }