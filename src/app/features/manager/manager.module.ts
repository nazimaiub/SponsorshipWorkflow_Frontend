import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { PendingApprovalsComponent } from './pages/pending-approvals/pending-approvals.component';


@NgModule({
  declarations: [
    PendingApprovalsComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
