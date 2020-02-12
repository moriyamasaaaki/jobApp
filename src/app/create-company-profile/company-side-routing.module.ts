import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FormGuard } from '../guards/form.guard';

const routes: Routes = [
  {
    path: '',
    component: RegisterFormComponent,
    canDeactivate: [FormGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanySideRoutingModule {}
