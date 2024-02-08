import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundeMainComponent } from './kunde-main.component';
import { ListKundeComponent } from './list-kunde/list-kunde.component';


describe('KundeMainComponent', () => {
  let component: KundeMainComponent;
  let fixture: ComponentFixture<KundeMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KundeMainComponent, ListKundeComponent]
    });
    fixture = TestBed.createComponent(KundeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
