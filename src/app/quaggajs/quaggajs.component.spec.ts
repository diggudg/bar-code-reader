import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuaggajsComponent } from './quaggajs.component';

describe('QuaggajsComponent', () => {
  let component: QuaggajsComponent;
  let fixture: ComponentFixture<QuaggajsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuaggajsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuaggajsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
