import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { PendingApprovalsComponent } from './pages/pending-approvals/pending-approvals.component';
import { RequestorModule } from '../requestor/requestor.module';


@NgModule({
  declarations: [
    PendingApprovalsComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    RequestorModule
  ]
})
export class ManagerModule { }
