import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pathrise-frontend';
  constructor(private router: Router) {
  }
  home() {
    this.router.navigateByUrl('/');
  }
}
