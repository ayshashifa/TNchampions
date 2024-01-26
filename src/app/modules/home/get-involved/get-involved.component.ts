import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userDetailsStore } from 'src/app/store/user-details';
import { Router } from '@angular/router';
import { backendUrl } from 'src/app/constants/app.constants';
@Component({
  selector: 'app-get-involved',
  templateUrl: './get-involved.component.html',
  styleUrls: ['./get-involved.component.scss']
})
export class GetInvolvedComponent {
  userEmail: string | undefined;
  donationAmount: number | undefined;
  message: string | undefined;
  userData: any = null

  constructor(private http: HttpClient, private userStore: userDetailsStore, private router: Router) {
    this.userStore.userData.subscribe((data: any) => {
      this.userData = data
    });
  }

  onSubmit() {
    // if (!this.donationAmount || isNaN(Number(this.donationAmount))) {
    if (!this.donationAmount)
      return;
    if (this.userData?.email) {
      const url = `${backendUrl()}/get-donation?useremail=${this.userData?.email}&amount=${this.donationAmount}`;
      window.open(url, '_blank');
    } else {
      this.router.navigate(['/register'], { queryParams: { donate: true } });
    }
  }
  signup() {
    this.router.navigate(['register']);
  }
}
