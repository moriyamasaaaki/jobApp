import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'top',
    loadChildren: () => import('./top/top.module').then(m => m.TopModule)
  },

  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule)
  },

    {
    path: 'terms',
    loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule)
  },

  {
    path: 'comlaw',
    loadChildren: () => import('./comlaw/comlaw.module').then(m => m.ComlawModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
