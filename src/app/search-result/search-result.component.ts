import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { searchClient } from '../../environments/environment';
import { WindowService } from '../services/window.service';

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
    private windowService: WindowService
  ) {
    this.route.queryParamMap.subscribe(map => {
      this.resultParams.query = map.get('label');
    });
  }

  ngOnInit() {
    this.windowService.handleResizeWindow(window.innerWidth);
  }
}
