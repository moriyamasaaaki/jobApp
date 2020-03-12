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
      title: 'Proxy Works-代行サービスの求人サービス-',
      descrption:
        'Proxy Worksは代行サービスやレンタルなど人が代替えしてくれる求人サービスです。',
      ogTitle: 'OGPTitle',
      ogDescription: 'OGPDescription',
      ogImage: 'OGPImage'
    },
    loadChildren: () => import('./home/top.module').then(m => m.TopModule)
  },

  {
    path: 'detail',
    data: {
      title: '求人詳細ページ',
      descrption: '詳細ページの概要を表示',
      ogTitle: 'OGPTitle',
      ogDescription: 'OGPDescription',
      ogImage: 'OGPImage'
    },
    loadChildren: () =>
      import('./detail/detail.module').then(m => m.DetailModule)
  },

  {
    path: 'terms',
    data: { title: '利用規約' },
    loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule)
  },

  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then(m => m.HelpModule)
  },

  {
    path: 'comlaw',
    data: { title: '特定商取引に関する表記' },
    loadChildren: () =>
      import('./comlaw/comlaw.module').then(m => m.ComlawModule)
  },

  {
    path: 'privacy',
    data: { title: 'プライバシーポリシー' },
    loadChildren: () =>
      import('./privacy/privacy.module').then(m => m.PrivacyModule)
  },

  {
    path: 'keep',
    data: { title: 'お気に入り一覧' },
    loadChildren: () => import('./keep/keep.module').then(m => m.KeepModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard, UserGuard]
  },

  {
    path: 'profile',
    data: { title: 'プロフィール作成' },
    loadChildren: () =>
      import('./create-user-profile/profile.module').then(m => m.ProfileModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard, UserGuard]
  },

  {
    path: 'mypage',
    data: { title: 'マイページ' },
    loadChildren: () =>
      import('./mypage/mypage.module').then(m => m.MypageModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard, UserGuard]
  },

  {
    path: 'recruitment',
    data: { title: '求人作成' },
    loadChildren: () =>
      import('./recruitment/form.module').then(m => m.FormModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard, CompanyGuard]
  },

  {
    path: 'about',
    data: { title: '代行サービスについて' },
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },

  {
    path: 'plan',
    data: { title: 'プラン/決済' },
    loadChildren: () => import('./plan/plan.module').then(m => m.PlanModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },

  {
    path: 'companySideForm',
    data: { title: 'プロフィール作成' },
    loadChildren: () =>
      import('./create-company-profile/company-side.module').then(
        m => m.CompanySideModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard, CompanyGuard]
  },

  {
    path: 'companyProfile',
    data: { title: 'プロフィール' },
    loadChildren: () =>
      import('./company-profile/company-profile.module').then(
        m => m.CompanyProfileModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard, CompanyGuard]
  },

  {
    path: 'joblist',
    data: { title: '求人一覧' },
    loadChildren: () =>
      import('./joblist/joblist.module').then(m => m.JoblistModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },

  {
    path: 'companyjoblist',
    data: { title: '自社求人一覧' },
    loadChildren: () =>
      import('./company-job-list/company-job-list.module').then(
        m => m.CompanyJobListModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard, CompanyGuard]
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
