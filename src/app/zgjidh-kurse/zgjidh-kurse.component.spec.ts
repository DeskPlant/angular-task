import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZgjidhKurseComponent } from './zgjidh-kurse.component';

describe('ZgjidhKurseComponent', () => {
  let component: ZgjidhKurseComponent;
  let fixture: ComponentFixture<ZgjidhKurseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZgjidhKurseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZgjidhKurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
