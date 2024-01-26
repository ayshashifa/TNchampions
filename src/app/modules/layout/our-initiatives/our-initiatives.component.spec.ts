import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OURINITIATIVESComponent } from './our-initiatives.component';

describe('OURINITIATIVESComponent', () => {
  let component: OURINITIATIVESComponent;
  let fixture: ComponentFixture<OURINITIATIVESComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OURINITIATIVESComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OURINITIATIVESComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
