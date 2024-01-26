import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'TN-Champions-Foundation';
  ngOnInit() {
  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd)
  ).subscribe(() => {
    window.scrollTo(0, 0);
  });
}
}
