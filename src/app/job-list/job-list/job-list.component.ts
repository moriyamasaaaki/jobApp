import { Component, OnInit } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';
import { Observable } from 'rxjs';
import { JobPostService } from 'src/app/services/job-post.service';
import { DrawerService } from 'src/app/services/drawer.service';

@Component({
  selector: 'app-joblist',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JoblistComponent implements OnInit {
  jobs$: Observable<DetailJob[]> = this.jobPostService.getAllJobs();

  constructor(
    private jobPostService: JobPostService,
    private drawerService: DrawerService
  ) {}

  ngOnInit() {
    this.handleResizeWindow(window.innerWidth);
  }
  handleResizeWindow(width: number) {
    if (1023 < width) {
      this.drawerService.open();
    } else {
      this.drawerService.close();
    }
  }
}
