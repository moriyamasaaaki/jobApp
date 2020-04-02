import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { searchClient } from '../../environments/environment';
import { DrawerService } from '../services/drawer.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  resultParams = {
    hitsPerPage: '20',
    query: ''
  };
  config = {
    indexName: 'JobPosts',
    searchClient
  };

  constructor(
    private route: ActivatedRoute,
    private drawerService: DrawerService
  ) {
    this.drawerService.open();
    this.route.queryParamMap.subscribe(map => {
      this.resultParams.query = map.get('workPlace');
    });
  }

  ngOnInit() {}
}
