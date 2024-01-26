import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { appApiResources, backendUrl } from 'src/app/constants/app.constants';
import { HttpService } from 'src/app/services/http/http.service';
import { HeaderComponent } from '../../layout/header/header.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-sponsorship-form',
  templateUrl: './sponsorship-form.component.html',
  styleUrls: ['./sponsorship-form.component.scss'],
})
export class SponsorshipFormComponent {
  submitted = false;
  loading = false;
  userData1: any = null;
  id: any;
  upload_proof: any = null;
  birth_certificate: any = null;
  other_purpose_attachment: any=null;
  aadhaar_copy: any = null;
  proof_achieve: any = null;
  form: any;
  proof_achieves = '';
  maxFileSizeErrorimg: string | null = 'Maximum file size is 3 MB';
  maxFileSizeErrorimg1: string | null = 'Maximum file size is 3 MB';
  maxFileSizeErrorimg2: string | null = 'Maximum file size is 3 MB';
  maxFileSizeErrorimg3: string | null = 'Maximum file size is 3 MB';
  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.submitted = false;
  }
  @ViewChild('openRegOtpModal') openOtpModal!: ElementRef;
  @ViewChild('closeRegOtpModal') closeOtpModal!: ElementRef;
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  registration_id: any = '';
  ngOnInit(): void {
    let payload = {
      registration_id: this.registration_id,
    };
    this.getdataform();
    this.thirdStepFunc();
  }
  getdataform() {
    this.http.get(appApiResources.personaldetails).subscribe({
      next: (data: any) => {
        this.loading = false;
        if (data.status == 'success') {
          this.userData1 = data.data[0];
          console.log(this.userData1);
        }
      },
    });
  }
  getError(fieldName: string) {
    if (!this.submitted) return false;
    else return this.form.controls[fieldName]?.errors;
  }

  thirdStepFunc(): void {
    this.form = this.fb.group({
      purpose: ['', [Validators.required]],
      ifsc_code: [''],
      branch_name: [''],
      account_no: [''],
      bank_name: [''],
      name_acc_holder: [''],
      upload_proof: [''],
      birth_certificate: [''],
      aadhaar_copy: [''],
      type_requirement: [''],
      declaration: [''],
      purpose_description: [''],
      registration_id: [''],
      type_requirement_details: [''],
      other_purpose_attachment: [''],
      //Achievements new
      name_event: [''],
      level: [''],
      discipline: [''],
      proof_achieve: [''],
      achievements: this.fb.array([this.createAchievementFormGroup()]),
    });
  }

  // Achievement dynamic form

  createAchievementFormGroup() {
    return this.fb.group({
      event_name: ['', Validators.required],
      discipline: [''],
      level: [''],
      proof_achieve: [''],
      customDisciplineInputVisible: false,
      customDiscipline: [''],
    });
  }

  addAchievement() {
    const achievementsArray = this.form.get('achievements') as FormArray;
    if (achievementsArray.length < 3) {
      achievementsArray.push(this.createAchievementFormGroup());
    }
  }

  removeAchievement(index: number) {
    const achievementsArray = this.form.get('achievements') as FormArray;
    if (achievementsArray.length > 1) {
      achievementsArray.removeAt(index);
    }
  }
  proof_achieve_array: any = [];
  proof_achieves_array: any = [];

  onProofAchieveChangeArray(event: any, index: number) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        this.maxFileSizeErrorimg =
          'File size exceeds the maximum limit of 3 MB.';
      } else {
        this.proof_achieve = file;
        this.proof_achieve_array[index] = file;
        this.proof_achieves_array[index] = file.name;
        this.maxFileSizeErrorimg =
          'File size exceeds the maximum limit of 3 MB.';
      }
    }
  }

  declaration: number = 0;

  // Function to handle checkbox changes
  onCheckboxChange() {
    this.declaration = this.declaration === 1 ? 0 : 1;
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;
    console.log('Passed data', this.form.value);
    const declaration = this.form.value.declaration ? 1 : 0;
    this.loading = true;
    const formData = new FormData();
    formData.append('ifsc_code', this.form.value.ifsc_code);
    formData.append('branch_name', this.form.value.branch_name);
    formData.append('account_no', this.form.value.account_no);
    formData.append('bank_name', this.form.value.bank_name);
    formData.append('name_acc_holder', this.form.value.name_acc_holder);
    formData.append('type_requirement', this.form.value.type_requirement);
    formData.append('declaration', this.form.value.declaration);
    formData.append('purpose', this.form.value.purpose);
    formData.append('upload_proof', this.upload_proof);
    formData.append('birth_certificate', this.birth_certificate);
    formData.append('other_purpose_attachment', this.other_purpose_attachment);
    formData.append('aadhaar_copy', this.aadhaar_copy);
    formData.append('purpose_description', this.form.value.purpose_description);
    formData.append(
      'type_requirement_details',
      this.form.value.type_requirement_details
    );
    const achievements = this.form.value.achievements;
    achievements.forEach((value: any, key: number) => {
      formData.append('name_event[]', value.event_name);
      formData.append('discipline[]', value.discipline);
      formData.append('level[]', value.level);
      formData.append('proof_achieve[]', this.proof_achieve_array[key]);
      formData.append('customDiscipline[]', value.customDiscipline);
    });

    this.http.post(appApiResources.Sponsorshipform, formData).subscribe({
      next: (data: any) => {
        this.loading = false;
        if (data.status == 'success') {
          this.toastr.success('Registration Successfully', 'Success');
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

  dropdownData = [
    {
      name: 'All India Inter University',
    },
    {
      name: 'Asian Games',
    },
    {
      name: 'Commonwealth Games',
    },
    {
      name: 'Federation Game',
    },
    {
      name: 'International Federation',
    },
    {
      name: 'National Games',
    },
    {
      name: 'National School Games Championships organised by SGFI/Khelo India Youth Games',
    },
    {
      name: 'Olympic Games',
      type: 'Summer',
    },
    {
      name: 'Olympic Games',
      type: 'Winter',
    },
    {
      name: 'Others',
    },
    {
      name: 'Para Asian Games',
    },
    {
      name: 'Paralympics Games',
    },
    {
      name: 'SAF Championships/Senior National Championships',
    },
    {
      name: 'Senior National Championship',
    },
    {
      name: 'World Championships',
    },
    {
      name: 'World Schools Championships',
    },
    {
      name: 'Youth Olympic Games',
    },
  ];

  selectedDiscipline: any;
  disciplines = [
    'Archery',
    'Athletics',
    'Badminton',
    'Billiards and Snooker',
    'Body Building',
    'Boxing',
    'Canoeing and Kayaking',
    'Carrom',
    'Chess',
    'Cycling',
    'Fencing',
    'Gymnastics',
    'Judo',
    'Kickboxing',
    'Para Archery',
    'Para Athletics',
    'Para Badminton',
    'Para Chair Rugby',
    'Para Chess',
    'Para Judo',
    'Para Rowing',
    'Para Shooting',
    'Para Swimming',
    'Para Tennis',
    'Para Wheelchair Badminton',
    'Para Wheelchair Fencing',
    'Para Wheelchair Tennis',
    'Roller Skating',
    'Rowing',
    'Shooting',
    'Silambam',
    'Squash',
    'Swimming',
    'Table Tennis',
    'Taekwondo',
    'Tennis',
    'Triathlon',
    'Weightlifting',
    'Wrestling',
    'Wushu',
    'Yogasana',
  ];
  upload_proofs = '';
  onUploadProofChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        this.maxFileSizeErrorimg1 =
          'File size exceeds the maximum limit of 3 MB.';
      } else {
        this.upload_proof = file;
        this.upload_proofs = file.name;
        this.maxFileSizeErrorimg1 =
          'File size exceeds the maximum limit of 3 MB.';
      }
    }
  }

  onProofAchieveChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        this.maxFileSizeErrorimg =
          'File size exceeds the maximum limit of 3 MB.';
      } else {
        this.proof_achieve = file;
        this.proof_achieves = file.name;
        this.maxFileSizeErrorimg =
          'File size exceeds the maximum limit of 3 MB.';
      }
    }
  }
  other_purpose_attachments = '';
  onotherattachementChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        this.maxFileSizeErrorimg2 =
          'File size exceeds the maximum limit of 3 MB.';
      } else {
        this.other_purpose_attachment = file;
        this.other_purpose_attachments = file.name;
        this.maxFileSizeErrorimg2 =
          'File size exceeds the maximum limit of 3 MB.';
      }
    }
  }

  birth_certificates = '';
  onBirthCertificateChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        this.maxFileSizeErrorimg2 =
          'File size exceeds the maximum limit of 3 MB.';
      } else {
        this.birth_certificate = file;
        this.birth_certificates = file.name;
        this.maxFileSizeErrorimg2 =
          'File size exceeds the maximum limit of 3 MB.';
      }
    }
  }
  aadhaar_copys = '';
  onAadhaarCopyChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        this.maxFileSizeErrorimg3 =
          'File size exceeds the maximum limit of 3 MB.';
      } else {
        this.aadhaar_copy = file;
        this.aadhaar_copys = file.name;
        this.maxFileSizeErrorimg3 =
          'File size exceeds the maximum limit of 3 MB.';
      }
    }
  }

  customDisciplineInputVisible: boolean = false;
  customDiscipline: string = '';

  onDisciplineChange(achievementForm: FormGroup) {
    const disciplineControl = achievementForm.get('discipline');
    if (disciplineControl && disciplineControl.value === 'Other') {
      this.customDisciplineInputVisible = true;
    } else {
      this.customDisciplineInputVisible = false;
    }
  }
}
