import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-barcode',
  templateUrl: './ng-barcode.component.html',
  styleUrls: ['./ng-barcode.component.scss']
})
export class NgBarcodeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public onDetect(result: string): void {
    alert(result);
  }
}
