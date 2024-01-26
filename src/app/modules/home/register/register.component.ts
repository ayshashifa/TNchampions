import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getState } from 'src/app/common-functions/load-translation';
import { appApiResources, backendUrl } from 'src/app/constants/app.constants';
import { HttpService } from 'src/app/services/http/http.service';
import { HeaderComponent } from '../../layout/header/header.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  submitted = false;
  formType: 'individual' | 'corporate' | 'business' | 'npo' = 'individual';
  stateList = getState();
  loading = false;
  isDonate = false;
  rolechoose=true;
  showsignup=false;
  @ViewChild('openRegOtpModal') openOtpModal!: ElementRef;
  @ViewChild('closeRegOtpModal') closeOtpModal!: ElementRef;
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
    this.submitted = false;
    this.handleFormValidation();

    this.route.queryParams.subscribe(params => {
      if (params['donate']) {
        this.isDonate = true;
        this.updateValidator(['amount'], 'add');
      }
    });
  }

  form: FormGroup = new FormGroup({
    'name': new FormControl(''),
    'address': new FormControl(''),
    'country': new FormControl('india'),
    'state': new FormControl(''),
    'phone_no': new FormControl(''),
    'cin_no': new FormControl(''),
    'pincode': new FormControl(''),
    'region': new FormControl(''),
    'type': new FormControl('ind'),
    'per_name': new FormControl(''),
    'per_empid': new FormControl(''),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'per_mail': new FormControl(''),
    'per_contact': new FormControl(''),
    'ofc_location': new FormControl(''),
    'desig': new FormControl(''),
    'landline': new FormControl(''),
    'csr_account': new FormControl(''),
    'donate_csr_account': new FormControl(''),
    //Need to add
    'pan_no': new FormControl(''),
    'tin_no': new FormControl(''),
    'npo_reg_no': new FormControl(''),
    'npo_80g_name': new FormControl(''),
    'amount': new FormControl('')
  });



  getError(fieldName: string) {
    if (!this.submitted) return false;
    else return this.form.controls[fieldName]?.errors
  }

  formTypeChanges(data: any) {
    this.formType = data;
    this.submitted = false;
    this.form.reset();
    this.handleFormValidation();
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.loading = true;
    this.http.post(appApiResources.register, this.form.value).subscribe({
      next: (data: any) => {
        this.loading = false;
        if (data.status == 'success') {
          this.toastr.success('', 'Success');
          this.openOtpModal.nativeElement.click();
        }
      },
      error: error => {
        this.loading = false;
        let msg = error?.error?.message || error?.error?.error;
        if (!msg) msg = 'Try Again';
        this.toastr.error('', msg);
      }
    })
  }


  handleFormValidation() {
    this.updateValidator(['name', 'address', 'country', 'state', 'phone_no', 'cin_no', 'pincode', 'region', 'type',
      'per_name', 'per_empid', 'per_mail', 'per_contact', 'ofc_location', 'desig', 'landline', 'csr_account', 'donate_csr_account',
      'pan_no', 'tin_no', 'npo_reg_no', 'npo_80g_name', 'amount'], 'remove');
    if (this.isDonate == true) this.updateValidator(['amount'], 'add');
    if (this.formType == 'individual') {
      this.form.get('type')?.setValue('ind');
      this.updateValidator(['name', 'country', 'state', 'pincode', 'phone_no', 'pan_no'], 'add');
    } else if (this.formType == 'business') {
      this.form.get('type')?.setValue('business');
      this.updateValidator(['name', 'country', 'address', 'state', 'tin_no', 'per_name', 'per_empid', 'pincode', 'phone_no'], 'add');
    } else if (this.formType == 'corporate') {
      this.form.get('type')?.setValue('org');
      this.updateValidator(['name', 'country', 'address', 'state', 'cin_no', 'per_name', 'per_empid', 'pincode', 'phone_no'], 'add');
    } else if (this.formType == 'npo') {
      this.form.get('type')?.setValue('npo');
      this.updateValidator(['name', 'address', 'phone_no', 'pan_no', 'npo_reg_no', 'per_name', 'per_contact', 'npo_80g_name'], 'add');
    }
  }

  updateValidator(controls: any, type?: string) {
    if (!controls || !controls.length) return
    controls.forEach((element: string) => {
      if (type == 'add')
        if (element == 'phone_no') this.form.get(element)?.setValidators([Validators.required, Validators.minLength(10)]);
        else if (element == 'pincode') this.form.get(element)?.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
        else this.form.get(element)?.setValidators(Validators.required);
      else this.form.get(element)?.setValidators(null);
      this.form.get(element)?.updateValueAndValidity();
    });
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  sendOtp(otp: any) {
    if (!otp || otp.length != 6) {
      this.toastr.error('', 'Enter Valid 6 digit OTP Number');
      return;
    }
    this.loading = true;
    this.http.post(appApiResources.otpVerify, { otp: otp, email: this.form.value.email }).subscribe({
      next: (data: any) => {
        this.loading = false;
        if (data.status == 'success' && data.token) {
          localStorage.setItem('token', data.token);
          this.closeOtpModal?.nativeElement.click();
          this.router.navigate(['/dashboard']);
          if (this.isDonate == true && this.form.value.email && this.form.value.amount) {
            setTimeout(() => { window.location.href = `${backendUrl()}/get-donation?useremail=${this.form.value.email}&amount=${this.form.value.amount}` })
          } else {
            setTimeout(() => { location.reload() })
          }
        }
      },
      error: error => {
        this.loading = false;
        let msg = error?.error?.message;
        if (!msg) msg = 'Invalid OTP';
        this.toastr.error('', msg);
      }
    })
  }

  openLoginModal() {
    this.headerComponent.openLoginModal()
  }
user(){
this.showsignup=true;
this.rolechoose=false;
}
recipient(){
  this.router.navigate(['registration-form']);
}
}
