import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quagga2Component } from './quagga2.component';

describe('Quagga2Component', () => {
  let component: Quagga2Component;
  let fixture: ComponentFixture<Quagga2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Quagga2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Quagga2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
