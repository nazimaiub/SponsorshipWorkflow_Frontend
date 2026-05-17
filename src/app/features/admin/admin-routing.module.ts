import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllRequestsComponent } from './pages/all-requests/all-requests.component';
import { WorkflowHistoryComponent } from './pages/workflow-history/workflow-history.component';

const routes: Routes = [
  {
    path: '',
    component: AllRequestsComponent
  },
  {
    path: 'history',
    component: WorkflowHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }