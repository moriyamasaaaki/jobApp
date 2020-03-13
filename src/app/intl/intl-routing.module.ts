import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsComponent } from './terms/terms.component';
import { ComlawComponent } from './comlaw/comlaw.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: 'terms',
    pathMatch: 'full',
    data: { title: '利用規約' },
    component: TermsComponent
  },
  {
    path: 'comlaw',
    pathMatch: 'full',
    data: { title: '特定商取引に関する表記' },
    component: ComlawComponent
  },
  {
    path: 'privacy',
    pathMatch: 'full',
    data: { title: 'プライバシーポリシー' },
    component: PrivacyComponent
  },
  {
    path: 'help',
    pathMatch: 'full',
    data: { title: 'ヘルプ' },
    component: HelpComponent
  },
  {
    path: 'about',
    pathMatch: 'full',
    data: { title: '代行サービスについて' },
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntlRoutingModule {}
