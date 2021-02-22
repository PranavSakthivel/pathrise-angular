import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './boards/boards.component';
import { JobsComponent } from './jobs/jobs.component';

const routes: Routes = [
  { path: '', component: BoardsComponent },
  { path: 'jobs/:jobBoard', component: JobsComponent } //jobs/:jobBoard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
