import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { searchClient } from '../../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  config = {
    indexName: 'JobPosts',
    searchClient
  };

  user$ = this.authService.afUser$;

  constructor(private authService: AuthService) {}

  ngOnInit() {}
}
