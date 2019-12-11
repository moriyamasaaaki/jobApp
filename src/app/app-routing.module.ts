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

    {
    path: 'keep',
    loadChildren: () => import('./keep/keep.module').then(m => m.KeepModule)
  },

  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },

  {
    path: 'recruitment',
    loadChildren: () => import('./form/form.module').then(m => m.FormModule)
  },

  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },

  {
    path: 'plan',
    loadChildren: () => import('./plan/plan.module').then(m => m.PlanModule)
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
