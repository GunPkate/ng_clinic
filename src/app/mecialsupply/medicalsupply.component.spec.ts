import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalSupplyComponent } from './medicalsupply.component';

describe('TreatmentComponent', () => {
  let component: MedicalSupplyComponent;
  let fixture: ComponentFixture<MedicalSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalSupplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
