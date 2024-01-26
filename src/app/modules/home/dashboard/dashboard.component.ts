import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { userDetailsStore } from 'src/app/store/user-details';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  userData: any = null
  constructor(private userStore: userDetailsStore, private router: Router) {
    this.userStore.userData.subscribe((data: any) => {
      this.userData = data
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    setTimeout(() => { location.reload() }, 100)
  }
}
