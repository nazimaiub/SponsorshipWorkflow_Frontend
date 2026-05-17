import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestorRoutingModule } from './requestor-routing.module';
import { MyRequestsComponent } from './pages/my-requests/my-requests.component';
import { CreateRequestComponent } from './pages/create-request/create-request.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RequestStatusStepperComponent } from 'src/app/shared/request-status-stepper/request-status-stepper.component';

@NgModule({
  declarations: [
    MyRequestsComponent,
    CreateRequestComponent,
    RequestStatusStepperComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RequestorRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule
  ],
  exports: [
    MyRequestsComponent,
    RequestStatusStepperComponent
  ]
})
export class RequestorModule { }
