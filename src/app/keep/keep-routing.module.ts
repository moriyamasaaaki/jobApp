import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KeepComponent } from './keep/keep.component';


const routes: Routes = [
  {
    path: '',
    component: KeepComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeepRoutingModule { }
