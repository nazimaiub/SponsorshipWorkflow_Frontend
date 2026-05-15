import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestorRoutingModule } from './requestor-routing.module';
import { MyRequestsComponent } from './pages/my-requests/my-requests.component';
import { CreateRequestComponent } from './pages/create-request/create-request.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyRequestsComponent,
    CreateRequestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RequestorRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class RequestorModule { }
