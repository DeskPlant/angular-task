import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrijoKurseComponent } from './krijo-kurse.component';

describe('KrijoKurseComponent', () => {
  let component: KrijoKurseComponent;
  let fixture: ComponentFixture<KrijoKurseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KrijoKurseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KrijoKurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
