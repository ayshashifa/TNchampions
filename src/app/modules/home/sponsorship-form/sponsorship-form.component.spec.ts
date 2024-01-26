import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipFormComponent } from './sponsorship-form.component';

describe('SponsorshipFormComponent', () => {
  let component: SponsorshipFormComponent;
  let fixture: ComponentFixture<SponsorshipFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorshipFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorshipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
