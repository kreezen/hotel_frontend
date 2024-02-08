import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKundeComponent } from './list-kunde.component';

describe('ListKundeComponent', () => {
  let component: ListKundeComponent;
  let fixture: ComponentFixture<ListKundeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListKundeComponent]
    });
    fixture = TestBed.createComponent(ListKundeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
