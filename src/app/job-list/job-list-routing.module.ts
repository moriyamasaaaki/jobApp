import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoblistComponent } from './job-list/job-list.component';

const routes: Routes = [
  {
    path: '',
    component: JoblistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JoblistRoutingModule {}
