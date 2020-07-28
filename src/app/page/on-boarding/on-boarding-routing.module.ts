import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnBoarding001Component } from './on-boarding001/on-boarding001.component';
const routes: Routes = [
  { path: 'OnBoarding001', component: OnBoarding001Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnBoardingRoutingModule { }
