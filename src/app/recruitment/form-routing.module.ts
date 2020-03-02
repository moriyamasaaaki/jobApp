import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { FormGuard } from '../guards/form.guard';

const routes: Routes = [
  {
    path: '',
    component: RecruitmentComponent,
    canDeactivate: [FormGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule {}
