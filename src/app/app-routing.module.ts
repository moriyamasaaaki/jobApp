import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/top.module').then(m => m.TopModule)
  },

  {
    path: 'detail',
    loadChildren: () =>
      import('./detail/detail.module').then(m => m.DetailModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },

  {
    path: 'terms',
    loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule)
  },

  {
    path: 'comlaw',
    loadChildren: () =>
      import('./comlaw/comlaw.module').then(m => m.ComlawModule)
  },

  {
    path: 'privacy',
    loadChildren: () =>
      import('./privacy/privacy.module').then(m => m.PrivacyModule)
  },

  {
    path: 'keep',
    loadChildren: () => import('./keep/keep.module').then(m => m.KeepModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },

  {
    path: 'profile',
    loadChildren: () =>
      import('./create-user-profile/profile.module').then(m => m.ProfileModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },

  {
    path: 'mypage',
    loadChildren: () =>
      import('./mypage/mypage.module').then(m => m.MypageModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },

  {
    path: 'recruitment',
    loadChildren: () =>
      import('./recruitment/recruitment.module').then(m => m.FormModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },

  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },

  {
    path: 'plan',
    loadChildren: () => import('./plan/plan.module').then(m => m.PlanModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },

  {
    path: 'companySideForm',
    loadChildren: () =>
      import('./create-company-profile/company-side.module').then(
        m => m.CompanySideModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },

  {
    path: 'companyProfile',
    loadChildren: () =>
      import('./company-profile/company-profile.module').then(
        m => m.CompanyProfileModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },

  {
    path: 'joblist',
    loadChildren: () =>
      import('./joblist/joblist.module').then(m => m.JoblistModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },

  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
