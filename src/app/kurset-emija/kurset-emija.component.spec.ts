import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KursetEMijaComponent } from './kurset-emija.component';

describe('KursetEMijaComponent', () => {
  let component: KursetEMijaComponent;
  let fixture: ComponentFixture<KursetEMijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KursetEMijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KursetEMijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
