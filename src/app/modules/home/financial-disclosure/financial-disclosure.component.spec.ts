import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialDisclosureComponent } from './financial-disclosure.component';

describe('FinancialDisclosureComponent', () => {
  let component: FinancialDisclosureComponent;
  let fixture: ComponentFixture<FinancialDisclosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialDisclosureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialDisclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
