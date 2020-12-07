import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScanDetected } from 'ngx-scanner-detection';

@Component({
  selector: 'app-ngx-scanner',
  templateUrl: './ngx-scanner.component.html',
  styleUrls: ['./ngx-scanner.component.scss']
})
export class NgxScannerComponent implements OnInit {
  @ViewChild('input') input: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  handle(event: ScanDetected) {
    console.log(event);
    this.input.nativeElement.value = event.barcode;
  }

  simulateScanner() {
    const s = '4260182250013';
    for (let i = 0; i < s.length; i++) {
      const e = new KeyboardEvent('keyup', { bubbles: true, cancelable: true, key: s[i], shiftKey: false });
      setTimeout(() => document.dispatchEvent(e));
    }
    const xe = new KeyboardEvent('keyup', { bubbles: true, cancelable: true, key: 'Enter', shiftKey: false });
    setTimeout(() => document.dispatchEvent(xe));
  }

}
