import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AllRequestsComponent } from './pages/all-requests/all-requests.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { RequestorModule } from '../requestor/requestor.module';
import { WorkflowHistoryComponent } from './pages/workflow-history/workflow-history.component';
@NgModule({
  declarations: [
    AllRequestsComponent,
    WorkflowHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    RequestorModule
  ]
})
export class AdminModule { }
