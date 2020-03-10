import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { searchClient } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  user$ = this.authService.afUser$;

  inputParams = {
    hitsPerPage: 10,
    query: ''
  };
  config = {
    indexName: 'JobPosts',
    searchClient
  };

  search(workPlace: string) {
    this.router.navigate(['/search'], {
      queryParams: {
        workPlace
      }
    });
  }

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParamMap.subscribe(map => {
      this.inputParams.query = map.get('q');
    });
  }

  ngOnInit() {}
}
