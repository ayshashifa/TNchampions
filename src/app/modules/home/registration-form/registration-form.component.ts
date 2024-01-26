import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appApiResources, backendUrl } from 'src/app/constants/app.constants';
import { HttpService } from 'src/app/services/http/http.service';
import { HeaderComponent } from '../../layout/header/header.component';
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  submitted = false;
  loading = false;
  photo: any = null;

form:any;
  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,

  ) {
    this.submitted = false;
  }
  @ViewChild('openRegOtpModal') openOtpModal!: ElementRef;
  @ViewChild('closeRegOtpModal') closeOtpModal!: ElementRef;
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  ngOnInit():void{
    this.thirdStepFunc();
  }
  thirdStepFunc(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      aadhaar_no: ['', [Validators.required]],
      emailid: ['', [Validators.required, Validators.email]],
      mobile_no:['', [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]],
      photo: [''],
      address:  ['', [Validators.required]],
      age:  ['', [Validators.required]],
      father_name:  ['', [Validators.required]],
      dob:  ['', [Validators.required]],
      gender:  ['', [Validators.required]],
      mother_name:  ['', [Validators.required]],
      alter_mobile:  [''],
    });
  }
 
  onSubmit() {
    this.submitted = true;
    this.form.get('type')?.setValue('sponser');
    if (this.form.invalid) return;
    this.loading = true;
    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('aadhaar_no', this.form.value.aadhaar_no);
    formData.append('emailid', this.form.value.emailid);
    formData.append('mobile_no', this.form.value.mobile_no);
    formData.append('address', this.form.value.address);
    formData.append('age', this.form.value.age);
    formData.append('father_name', this.form.value.father_name);
    formData.append('dob', this.form.value.dob);
    formData.append('gender', this.form.value.gender);
    formData.append('mother_name', this.form.value.mother_name);
    formData.append('alter_mobile', this.form.value.alter_mobile);

    formData.append('photo', this.photo);
    console.log("form finl",formData);
    this.http
      .post(appApiResources.registrationform,formData)
      .subscribe({
        next: (data: any) => {
          this.loading = false;
          if (data.status == 'success') {
            this.toastr.success('', 'Success');
            this.openOtpModal.nativeElement.click();
          }
        },
        error: (error) => {
          this.loading = false;
          let msg = error?.error?.message || error?.error?.error;
          if (!msg) msg = 'Try Again';
          this.toastr.error('', msg);
        },
      });
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  getError1(fieldName: string) {
    if (!this.submitted) return false;
    else return this.form.controls[fieldName]?.errors;
  }
 
  // photo: string | null = null;
  maxFileSizeErrorimg: string | null = 'Maximum file size is 1 MB';
  photos = '';
  // photoFormControl = new FormControl(null);
  // onUploadPhotoChange(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     this.photo = file;
  //  }  }
  onUploadPhotoChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        this.maxFileSizeErrorimg =
          'File size exceeds the maximum limit of 1 MB.';
      } else {
        this.photo = file;
        this.photos = file.name;
        this.maxFileSizeErrorimg =
          'File size exceeds the maximum limit of 1 MB.';
      }
    }
  }
  getObjectURL(file: File): string | null {
    if (file) {
      return URL.createObjectURL(file);
    }
    return null;
  }

  onDelete(): void {
    this.photo = null;
    // this.photoFormControl.reset();
  }

  sendOtp(otp: any,type:any) {
    if (!otp || otp.length != 6) {
      this.toastr.error('', 'Enter Valid 6 digit OTP Number');
      return;
    }
    this.loading = true;
    this.http
      .post(appApiResources.otpVerify, {
        otp: otp,
        email: this.form.value.emailid,
        type:type,
      })
      .subscribe({
        next: (data: any) => {
          this.loading = false;
          if (data.status == 'success' && data.token) {
            localStorage.setItem('token', data.token);
            this.closeOtpModal?.nativeElement.click();
            this.router.navigate(['/Sponsorship-form']);
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

  openLoginModal() {
    this.headerComponent.openLoginModal();
  }

}
