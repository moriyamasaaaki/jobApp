import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LegalComponent } from './legal/legal.component';


const routes: Routes = [
  {
    path: '',
    component: LegalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalRoutingModule { }
