import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Upload001Component } from './upload001/upload001.component';

const routes: Routes = [
  { path: 'Upload001', component: Upload001Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
