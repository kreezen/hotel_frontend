import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterKundeComponent } from './filter-kunde.component';

describe('FilterKundeComponent', () => {
  let component: FilterKundeComponent;
  let fixture: ComponentFixture<FilterKundeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FilterKundeComponent]
    });
    fixture = TestBed.createComponent(FilterKundeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
