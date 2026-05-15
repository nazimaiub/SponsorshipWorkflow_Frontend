import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [

  // default route → auth/login
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  // Auth module
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module')
        .then(m => m.AuthModule)
  },

  // Main layout routes
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'requestor',
        loadChildren: () =>
          import('./features/requestor/requestor.module')
            .then(m => m.RequestorModule)
      },
      {
        path: 'manager',
        loadChildren: () =>
          import('./features/manager/manager.module')
            .then(m => m.ManagerModule)
      },
      {
        path: 'finance',
        loadChildren: () =>
          import('./features/finance/finance.module')
            .then(m => m.FinanceModule)
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./features/admin/admin.module')
            .then(m => m.AdminModule)
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
