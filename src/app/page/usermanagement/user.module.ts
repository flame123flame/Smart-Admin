import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { ComponentsModule } from 'src/app/components/components.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './userDetail/userDetail.component';
import { OrganizeComponent } from './organize/organize.component';
import { OrganizeAddComponent } from './organize-add/organize-add.component';
import { RoleComponent } from './role/role.component';
import { RoleDetailComponent } from './roleDetail/roleDetail.component';
import { SapJsonComponent } from './sap-json/sap-json.component';
import { SapJsonDetailComponent } from './sap-json-detail/sap-json-detail.component';


const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'userDetail', component: UserDetailComponent },
  { path: 'organize', component: OrganizeComponent },
  { path: 'organize-add', component: OrganizeAddComponent },
  { path: 'role', component: RoleComponent },
  { path: 'roleDetail', component: RoleDetailComponent },
  { path: 'sapJson', component: SapJsonComponent },
  { path: 'sapJsonDetail', component: SapJsonDetailComponent }
];

@NgModule({
  declarations: [
    UserComponent,
    UserDetailComponent,
    OrganizeComponent,
    OrganizeAddComponent,
    RoleComponent,
    RoleDetailComponent,
    SapJsonComponent,
    SapJsonDetailComponent,

  ],
  imports: [
    CommonModule,
    ComponentsModule,
    DataTablesModule,
    RouterModule.forChild(routes),
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule, UserComponent, RoleComponent],
})
export class UserModule { }
