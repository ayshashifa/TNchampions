import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router) {}
  donatecash() {
    this.router.navigate(['involved']);
  }
  donatenow() {
    this.router.navigate(['involved']);
  }
}
