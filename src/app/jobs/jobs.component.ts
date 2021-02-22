import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Job } from '../../models/job';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent {
  public jobs$: Observable<Job[]>;
  public jobBoard: string;
  // MatPaginator Inputs
  length = 50;
  pageSize = 10;
  pageIndex = 0;

  // MatPaginator Output
  pageEvent: PageEvent;

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    //this.jobs$ = this.jobService.getJobOffers(this.pageIndex, this.pageSize, this.jobBoard);
    //console.log("handlePageEvent:", this.length, this.pageSize, this.pageIndex);
  }


  constructor(
    private jobService: FirebaseService,
    private route: ActivatedRoute
  ) {
    {
      this.jobs$ = this.route.paramMap.pipe(
        switchMap(
          (params: ParamMap): Observable<Job[]> => {
            const jobBoard = params.get('jobBoard');
            if (!jobBoard) {
              throw new Error('Missing jobBoard route parameter');
            }
            this.jobBoard = jobBoard;
            return this.jobService.getJobOffers(this.pageIndex, this.pageSize, jobBoard);
          }
        )
      );
    }
  }

  goToLink(url: string) {
    if (url !== '') window.open(url, '_blank');
  }
}
