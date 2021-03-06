import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { SearchResultComponent } from './search-result/search-result.component';

import { UserGuard } from './guards/user.guard';
import { CompanyGuard } from './guards/company.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: {
      title: 'Proxy Works-代行サービスを探そう-',
      descrption:
        'Proxy Worksは代行サービスやレンタルなど人が代替えしてくれるサービスを集めたものです。'
    },
    loadChildren: () => import('./home/top.module').then(m => m.TopModule)
  },

  {
    path: 'job/detail',
    loadChildren: () =>
      import('./detail/detail.module').then(m => m.DetailModule)
  },

  {
    path: 'intl',
    loadChildren: () => import('./intl/intl.module').then(m => m.IntlModule)
  },

  {
    path: 'user/keep',
    data: { title: 'お気に入り一覧' },
    loadChildren: () => import('./keep/keep.module').then(m => m.KeepModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard, UserGuard]
  },

  {
    path: 'user/profile/create',
    data: { title: 'プロフィール作成' },
    loadChildren: () =>
      import('./create-user-profile/profile.module').then(m => m.ProfileModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard, UserGuard]
  },

  {
    path: 'user/mypage',
    data: { title: 'マイページ' },
    loadChildren: () =>
      import('./mypage/mypage.module').then(m => m.MypageModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard, UserGuard]
  },

  {
    path: 'company/recruitment',
    data: { title: '投稿作成' },
    loadChildren: () =>
      import('./recruitment/form.module').then(m => m.FormModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard, CompanyGuard]
  },

  {
    path: 'plan',
    data: { title: 'プラン/決済' },
    loadChildren: () => import('./plan/plan.module').then(m => m.PlanModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard, CompanyGuard]
  },

  {
    path: 'company/profile/create',
    data: { title: 'プロフィール作成' },
    loadChildren: () =>
      import('./create-company-profile/company-side.module').then(
        m => m.CompanySideModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard, CompanyGuard]
  },

  {
    path: 'company/profile',
    data: { title: 'プロフィール' },
    loadChildren: () =>
      import('./company-profile/company-profile.module').then(
        m => m.CompanyProfileModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard, CompanyGuard]
  },

  {
    path: 'job/list',
    data: { title: '代行一覧' },
    loadChildren: () =>
      import('./job-list/job-list.module').then(m => m.JoblistModule)
  },

  {
    path: 'company/job/list',
    data: { title: 'マイ投稿一覧' },
    loadChildren: () =>
      import('./company-job-list/company-job-list.module').then(
        m => m.CompanyJobListModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard, CompanyGuard]
  },

  {
    path: 'job/detail',
    data: { title: 'いいねしたユーザー一覧' },
    loadChildren: () =>
      import('./favorite-user-list/favorite-user-list.module').then(
        m => m.FavoriteUserListModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard, CompanyGuard]
  },

  {
    path: 'about',
    data: { title: '代行サービス-Proxy Woprks-について' },
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },

  {
    path: 'search',
    component: SearchResultComponent
  },

  {
    path: '**',
    data: { title: 'ページが見つかりませんでした。' },
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
