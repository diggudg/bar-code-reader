import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgBarcodeDetectorModule } from 'ng-barcode-detector';
import { NgxScannerComponent } from './ngx-scanner/ngx-scanner.component';
import { ScannerDetectionModule } from 'ngx-scanner-detection';
import { QuaggajsComponent } from './quaggajs/quaggajs.component';
import { Quagga2Component } from './quagga2/quagga2.component';
import { NgBarcodeComponent } from './ng-barcode/ng-barcode.component';

@NgModule({
  declarations: [
    AppComponent,
    NgxScannerComponent,
    QuaggajsComponent,
    Quagga2Component,
    NgBarcodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgBarcodeDetectorModule,
    ScannerDetectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
