import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleyComponent } from './galley.component';

describe('GalleyComponent', () => {
  let component: GalleyComponent;
  let fixture: ComponentFixture<GalleyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
