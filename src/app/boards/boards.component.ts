import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Board } from '../../models/board';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

// import { switchMap } from 'rxjs/operators';
// import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent {
  boards: Board[];
  public readonly boards$: Observable<Board[]>;
  constructor(private boardService: FirebaseService, private router: Router) {
    this.boards$ = this.boardService.allBoards$;
  }

  viewBoardJobs(board: string) {
    this.router.navigateByUrl('/jobs/' + board);
  }

  goToLink(url: string) {
    window.open('http://' + url, '_blank');
  }
}
