import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoriteUserListComponent } from './favorite-user-list/favorite-user-list.component';

const routes: Routes = [
  {
    path: '',
    component: FavoriteUserListComponent
  },
  {
    path: ':id/like',
    component: FavoriteUserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoriteUserListRoutingModule {}
