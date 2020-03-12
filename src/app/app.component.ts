import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tokyo bite';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getSetTitle();
    this.metaService.addTag({
      name: 'description',
      content: 'Article Description'
    });
  }

  getSetTitle() {
    const appTitle = this.titleService.getTitle();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          console.log(child.snapshot.data.title);
          while (child.firstChild) {
            child = child.firstChild;
          }
          if (child.snapshot.data.title) {
            return child.snapshot.data.title;
          }
          return appTitle;
        })
      )
      .subscribe(data => {
        this.titleService.setTitle(data);
        if (data.descrption) {
          this.metaService.updateTag({
            name: 'description',
            content: data.descrption
          });
        } else {
          this.metaService.removeTag("name='description'");
        }
        if (data.robots) {
          this.metaService.updateTag({ name: 'robots', content: data.robots });
        } else {
          this.metaService.updateTag({
            name: 'robots',
            content: 'follow,index'
          });
        }

        if (data.ogUrl) {
          this.metaService.updateTag({
            property: 'og:url',
            content: data.ogUrl
          });
        } else {
          this.metaService.updateTag({
            property: 'og:url',
            content: this.router.url
          });
        }
      });
  }
}
