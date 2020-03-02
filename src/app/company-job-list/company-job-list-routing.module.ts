import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyJobListComponent } from './company-job-list/company-job-list.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyJobListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyJobListRoutingModule {}
