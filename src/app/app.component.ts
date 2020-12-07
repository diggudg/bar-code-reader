import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import Quagga from 'quagga';
import { BeepService } from './beep.service';
import { Quagga2Component } from './quagga2/quagga2.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bar-code-reader';
  @ViewChild(Quagga2Component)
  barcodeScanner: Quagga2Component;

  barcodeValue: string;

  ngAfterViewInit(): void {
    this.barcodeScanner.start();
  }

  onValueChanges(result): void {
    this.barcodeValue = result.codeResult.code;
  }

  onStarted(event): void {
    console.log('started', event);
  }

}
