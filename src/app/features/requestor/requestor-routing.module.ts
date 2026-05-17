import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyRequestsComponent } from './pages/my-requests/my-requests.component';
import { CreateRequestComponent } from './pages/create-request/create-request.component';

const routes: Routes = [
  {
    path: '',
    component: MyRequestsComponent
  },
  {
    path: 'create',
    component: CreateRequestComponent
  },
  {
  path: 'view/:id',
  component: CreateRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestorRoutingModule { }
