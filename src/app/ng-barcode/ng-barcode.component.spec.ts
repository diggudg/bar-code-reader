import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBarcodeComponent } from './ng-barcode.component';

describe('NgBarcodeComponent', () => {
  let component: NgBarcodeComponent;
  let fixture: ComponentFixture<NgBarcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgBarcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
