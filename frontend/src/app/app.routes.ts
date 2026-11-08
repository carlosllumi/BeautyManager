
import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Clientes } from './pages/clientes/clientes';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard
  },
  {
    path: 'clientes',
    component: Clientes
  },
  {
    path: '**',
    redirectTo: ''
  }
];
