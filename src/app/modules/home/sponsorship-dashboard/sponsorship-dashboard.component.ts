import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { appApiResources, backendUrl } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-sponsorship-dashboard',
  templateUrl: './sponsorship-dashboard.component.html',
  styleUrls: ['./sponsorship-dashboard.component.scss'],
})
export class SponsorshipDashboardComponent {
  achievement: any = null;
  constructor(public http: HttpService) {}
  userData1: any = null;
  submitted = false;
  loading = false;
  ngOnInit(): void {
    this.getpersonaldetails();
  }
  getpersonaldetails() {
    this.http.get(appApiResources.personaldetails).subscribe({
      next: (data: any) => {
        this.loading = false;
        if (data.status == 'success') {
          this.userData1 = data.data[0];
          this.achievement = data.achieve;
          // this.id= data.data.id;
          console.log(this.userData1);
          console.log(this.achievement);
        }
      },
    });
  }
}
