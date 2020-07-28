import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './buttons/button.module';
import { CardModule } from './card/card.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { NotificationModule } from './notification/notification.module';
import { ModalModule } from './modal/modal.module';
import { InputModule } from './input/input.module';
import { DirectivesModule } from '../common/directives/directives.module';
import { TemplateModule } from './template/template.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    BreadcrumbModule,
    NotificationModule,
    ModalModule,
    InputModule,
    DirectivesModule,
    TemplateModule
  ],
  exports: [
    ButtonModule,
    CardModule,
    BreadcrumbModule,
    NotificationModule,
    ModalModule,
    InputModule,
    DirectivesModule,
    TemplateModule
  ],  
})
export class ComponentsModule { }
