import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { IncidentRoutingModule } from './incident-routing.module';
import { Incident001Component } from './incident001/incident001.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { Incident002Component } from './incident002/incident002.component';

@NgModule({
  declarations: [Incident001Component, Incident002Component],
  imports: [
    FormsModule,
    CommonModule,
    IncidentRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class IncidentModule { }
