import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import Quagga, { QuaggaJSConfigObject } from '@ericblade/quagga2';
import defaultsDeep from 'lodash.defaultsdeep';
import { DEFAULT_CONFIG } from './quagga2.config';
import { mapToReader } from './quagga2.types';

@Component({
  selector: 'app-quagga2',
  templateUrl: './quagga2.component.html',
  styleUrls: ['./quagga2.component.scss']
})
export class Quagga2Component implements OnChanges, OnDestroy {

  constructor() { }
  @Input() type: string | string[] = ['code_128', 'code_39', 'ean_8'];

  @Input() deviceId: string;

  @Input() maxWidth = '100%';

  @Input() maxHeight: string;

  @Input() config: Partial<QuaggaJSConfigObject>;

  // Outputs
  @Output() valueChanges = new EventEmitter();

  @Output() started = new EventEmitter();

  @ViewChild('BarcodeScanner') barcodeScanner: ElementRef<HTMLDivElement>;

  get _maxWidth(): string {
    return this.maxWidth ? `${this.maxWidth}` : 'auto';
  }

  get _maxHeight(): string {
    return this.maxHeight ? `${this.maxHeight}` : 'auto';
  }

  private _started = false;

  get isStarted(): boolean {
    return this._started;
  }

  private configQuagga: QuaggaJSConfigObject;

  ngOnDestroy(): void {
    this.stop();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.restart();
  }

  private _init(): Promise<void> {
    return new Promise((resolve, reject) => {
      Quagga.onProcessed((result) => this.onProcessed(result));

      Quagga.onDetected((result) => this.onDetected(result));

      this.configQuagga = defaultsDeep({}, this.config, DEFAULT_CONFIG);

      this.configQuagga.inputStream.target = this.barcodeScanner.nativeElement;

      if (this.type) {
        this.configQuagga.decoder.readers = mapToReader(this.type);
      }

      if (this.deviceId) {
        this.configQuagga.inputStream.constraints.deviceId = this.deviceId;
      }

      Quagga.init(this.configQuagga, (err) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        resolve();
      });
    });
  }

  async start(): Promise<void> {
    if (!this._started) {
      await this._init();
      Quagga.start();
      this._started = true;
      this.started.next(true);
    }
  }

  stop(): void {
    if (this._started) {
      Quagga.stop();
      this._started = false;
      this.started.next(false);
    }
  }

  restart(): void {
    if (this._started) {
      this.stop();
      this.start();
    }
  }

  onProcessed(result: any): any {
    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;

    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(0, 0,
          parseInt(drawingCanvas.getAttribute('width'), 10),
          parseInt(drawingCanvas.getAttribute('height'), 10));
        result.boxes.filter((box: any) => {
          return box !== result.box;
        }).forEach((box: any) => {
          Quagga.ImageDebug.drawPath(box, {
            x: 0,
            y: 1,
          }, drawingCtx, {
            color: 'green',
            lineWidth: 2,
          });
        });
      }

      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, {
          x: 0,
          y: 1,
        }, drawingCtx, {
          color: '#00F',
          lineWidth: 2,
        });
      }

      if (result.codeResult && result.codeResult.code) {
        Quagga.ImageDebug.drawPath(result.line, {
          x: 'x',
          y: 'y',
        }, drawingCtx, {
          color: 'red',
          lineWidth: 3,
        });
      }

    }
  }

  onDetected(result): void {
    this.valueChanges.next(result);
  }

}
