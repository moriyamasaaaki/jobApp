import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopRoutingModule } from './top-routing.module';
import { TopComponent } from './top/top.component';
import { AttentionComponent } from './attention/attention.component';

import { MatButtonModule } from '@angular/material/button';
import { NewComponent } from './new/new.component';
import { SearchComponent } from '../search/search.component';


import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [TopComponent, AttentionComponent, NewComponent, SearchComponent],
  imports: [
    CommonModule,
    TopRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class TopModule {}
