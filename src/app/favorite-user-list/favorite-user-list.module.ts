import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteUserListRoutingModule } from './favorite-user-list-routing.module';
import { FavoriteUserListComponent } from './favorite-user-list/favorite-user-list.component';

@NgModule({
  declarations: [FavoriteUserListComponent],
  imports: [CommonModule, FavoriteUserListRoutingModule]
})
export class FavoriteUserListModule {}
