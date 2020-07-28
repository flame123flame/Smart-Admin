import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Incident001Component } from './incident001/incident001.component'
import { Incident002Component } from './incident002/incident002.component';

const routes: Routes = [
  { path: 'Incident001', component: Incident001Component },
  { path: 'Incident002', component: Incident002Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentRoutingModule { }
