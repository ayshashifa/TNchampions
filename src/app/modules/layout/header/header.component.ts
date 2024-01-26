import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appApiResources } from 'src/app/constants/app.constants';
import { HttpService } from 'src/app/services/http/http.service';
import { userDetailsStore } from 'src/app/store/user-details';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isHomePage = false;
  @ViewChild('openLoginPopup') openLoginPopup!: ElementRef;
  @ViewChild('closeLoginModal') closeLoginModal!: ElementRef;
  @ViewChild('openOtpModal') openOtpModal!: ElementRef;
  @ViewChild('closeOtpModal') closeOtpModal!: ElementRef;

  @ViewChild('openroleModal') openroleModal!: ElementRef;
  @ViewChild('closeroleModal') closeroleModal!: ElementRef;
  loading = false;
  @Input() singleImege = '/assets/logo/banner-img/banner1.JPG';
  userData: any = null;
  constructor(
    private toastr: ToastrService,
    private http: HttpService,
    private router: Router,
    private userStore: userDetailsStore
  ) {
    this.userStore.userData.subscribe((data: any) => {
      this.userData = data;
      // Check user type and set header text accordingly
      if (data && data.type) {
        if (data.type === 'sponsorship') {
          this.headerText = 'Sponsorship';
         
        } else {
          this.headerText = 'Dashboard';
          
        }
      }
    });

  }
  isLoggedIn() {
    return this.token !== '';
  }
  show = true;
  type: string = '';
  lang = localStorage.getItem('lang') || 'english';
  token = localStorage.getItem('token') || '';
  changeLang(data: string) {
    localStorage.setItem('lang', data);
    location.reload();
  }

  openOtp(email: any, type: any) {
    if (!email) {
      this.toastr.error('', 'Email is required');
      return;
    }
    this.loading = true;
    this.http
      .post(appApiResources.login, { email: email, type: type })
      .subscribe({
        next: (data: any) => {
          this.loading = false;
          this.openOtpModal?.nativeElement.click();
        },
        error: (error) => {
          this.loading = false;
          let msg = error?.error?.message;
          if (!msg) msg = 'Invalid User';
          this.toastr.error('', msg);
        },
      });
  }
  headerText: any = '';
  loginWIthOTP(otp: any, email: any, type: any) {
    if (!otp || otp.length != 6) {
      this.toastr.error('', 'Enter Valid 6 digit OTP Number');
      return;
    }
    this.loading = true;
    this.http
      .post(appApiResources.otpVerify, { otp: otp, email: email, type: type })
      .subscribe({
        next: (data: any) => {
          console.log('data');
          this.loading = false;
          if (data.status == 'success' && data.token) {
            localStorage.setItem('token', data.token);
            this.closeOtpModal?.nativeElement.click();
            console.log(this.token);
            const userType = data.userdata?.type;
            this.type = data.userdata?.type || '';
            console.log('Type:', this.type);
            if (userType === 'sponsorship') {
              this.headerText = 'Sponsorship';
              this.router.navigate(['/Sponsorship-form']);
              setTimeout(() => {
                location.reload();
              });
            } else  {
              this.headerText = 'dashboard';
              this.router.navigate(['/dashboard']);
              // this.Sponsorship = true;
              setTimeout(() => {
                location.reload();
              });
            }
          }
        },
        error: (error) => {
          this.loading = false;
          let msg = error?.error?.message;
          if (!msg) msg = 'Invalid OTP';
          this.toastr.error('', msg);
        },
      });
  }

  donatenow() {
    this.router.navigate(['involved']);
  }
  openLoginModal() {
    this.openLoginPopup.nativeElement.click();
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    setTimeout(() => {
      location.reload();
    }, 100);
  }
  Sponsorship = false;
  donor = false;
  opendonorlogin() {
    this.openLoginPopup.nativeElement.click();
    // this.type = 'Donor';
    this.donor = true;
    this.Sponsorship = false;
  }
  openrecipientlogin() {
    this.openLoginPopup.nativeElement.click();
    // this.type = 'sponsorship';
    this.Sponsorship = true;
    this.donor = false;
  }
  downloadPdf() {
    const pdfUrl = '../../../../assets/new/StepsRegistration.pdf';
    fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'GuideMe.pdf'; 
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }
}
