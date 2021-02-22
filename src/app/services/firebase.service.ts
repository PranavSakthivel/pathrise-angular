import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Board } from '../../models/board';
import { Job } from '../../models/job';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  public readonly allBoards$: Observable<Board[]>;
  constructor(private readonly afs: AngularFirestore) {

    this.allBoards$ = this.afs
      .collection<Board>('boards')
      .valueChanges()
      .pipe(shareReplay({ bufferSize: 1, refCount: false }));
  }

  getJobOffers(pageIndex: number, pageSize: number, jobBoard: string) {
    //console.log("getJobOffers:", pageIndex, pageSize, jobBoard);
    return this.afs
      .collection<Job>('offers', (ref) =>
        ref
        //.orderBy('Id')
        //.startAfter(pageIndex * pageSize)
        .where('JobSource', '==', jobBoard)
        .limit(200) //pageSize
      )
      .valueChanges({ idField: 'id' });
  }
}
