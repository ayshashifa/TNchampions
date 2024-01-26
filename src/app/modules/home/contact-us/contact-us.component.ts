import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { appApiResources } from 'src/app/constants/app.constants';
import { HttpService } from 'src/app/services/http/http.service';
import { userDetailsStore } from 'src/app/store/user-details';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  submitted = false;
  loading = false;
  userData: any = null
  form: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'contact': new FormControl('', [Validators.required, Validators.minLength(10)]),
    'message': new FormControl('', [Validators.required]),
  });

  getError(fieldName: string) {
    if (!this.submitted) return false;
    else return this.form.controls[fieldName]?.errors
  }
  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private userStore: userDetailsStore) {
    this.userStore.userData.subscribe((data: any) => {
      this.userData = data
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.loading = true;
    this.http.post(appApiResources.reachOut, this.form.value).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.toastr.success('', 'Submitted Succefully');
        this.form.reset();
      },
      error: error => {
        this.loading = false;
        this.toastr.error('', 'Try Again');
      }
    })
  }


  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


}
