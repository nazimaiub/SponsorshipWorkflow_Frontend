import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestorRoutingModule } from './requestor-routing.module';
import { MyRequestsComponent } from './pages/my-requests/my-requests.component';
import { CreateRequestComponent } from './pages/create-request/create-request.component';


@NgModule({
  declarations: [
    MyRequestsComponent,
    CreateRequestComponent
  ],
  imports: [
    CommonModule,
    RequestorRoutingModule
  ]
})
export class RequestorModule { }
