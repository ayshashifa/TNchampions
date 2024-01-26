import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateUpdateComponent } from './translate-update.component';

describe('TranslateUpdateComponent', () => {
  let component: TranslateUpdateComponent;
  let fixture: ComponentFixture<TranslateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
