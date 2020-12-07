import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgBarcodeDetectorComponent } from 'ng-barcode-detector';
import { AppComponent } from './app.component';
import { NgBarcodeComponent } from './ng-barcode/ng-barcode.component';
import { NgxScannerComponent } from './ngx-scanner/ngx-scanner.component';
import { Quagga2Component } from './quagga2/quagga2.component';
import { QuaggajsComponent } from './quaggajs/quaggajs.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'quagga',
    component: QuaggajsComponent,
  },
  {
    path: 'ng-bar-code',
    component: NgBarcodeComponent,
  },
  {
    path: 'ngx-bar-code',
    component: NgxScannerComponent,
  },
  {
    path: 'quagga2',
    component: Quagga2Component,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
