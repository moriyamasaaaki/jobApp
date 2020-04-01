import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { DrawerService } from './services/drawer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tokyo bite';
  uid: string;
  userLoginStatus: boolean;
  companyLoginStatus: boolean;
  user$ = this.authService.afUser$;
  display: boolean;
  opened: boolean;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private drawerService: DrawerService
  ) {
    // this.drawerService.close();
  }

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
        if (data.ogTitle) {
          this.metaService.updateTag({
            property: 'og:title',
            content: data.ogTitle
          });
        } else {
          this.metaService.removeTag("property='og:title'");
        }
        if (data.ogDescription) {
          this.metaService.updateTag({
            property: 'og:description',
            content: data.ogDescription
          });
        } else {
          this.metaService.removeTag("property='og:description'");
        }

        if (data.ogImage) {
          this.metaService.updateTag({
            property: 'og:image',
            content: data.ogImage
          });
        } else {
          this.metaService.removeTag("property='og:image'");
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
  searchNone() {
    return this.router.url === '/';
  }
}
