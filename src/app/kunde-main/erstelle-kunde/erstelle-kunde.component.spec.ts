import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErstelleKundeComponent } from './erstelle-kunde.component';

describe('ErstelleKundeComponent', () => {
  let component: ErstelleKundeComponent;
  let fixture: ComponentFixture<ErstelleKundeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ErstelleKundeComponent]
    });
    fixture = TestBed.createComponent(ErstelleKundeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
