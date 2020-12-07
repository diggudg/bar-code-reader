import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BeepService } from '../beep.service';
import Quagga from 'quagga';
@Component({
  selector: 'app-quaggajs',
  templateUrl: './quaggajs.component.html',
  styleUrls: ['./quaggajs.component.scss']
})
export class QuaggajsComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {
  }

  errorMessage: string;
  public lastScannedCode: string[] = [];
  private lastScannedCodeDate: number;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private beepService: BeepService,
  ) {
  }

  ngAfterViewInit(): void {
    if (!navigator.mediaDevices || !(typeof navigator.mediaDevices.getUserMedia === 'function')) {
      this.errorMessage = 'getUserMedia is not supported';
      return;
    }

    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        constraints: {
          width: 640,
          height: 480,
          facingMode: 'environment', // or user
        },
      },
      locator: {
        patchSize: 'medium',
        halfSample: true,
      },
      numOfWorkers: 4,
      decoder: {
        readers: ['code_128_reader'],
      },
      locate: false,
      area: { // defines rectangle of the detection/localization area
        top: '40%',    // top offset
        right: '0%',  // right offset
        left: '0%',   // left offset
        bottom: '40%'  // bottom offset
      },
      "box": [
        [77.4074243622672, 410.9288668804402],
        [0.050203235235130705, 310.53619724086366],
        [360.15706727788256, 33.05711026051813],
        [437.5142884049146, 133.44977990009465]
      ],
      "boxes": [
        [
          [77.4074243622672, 410.9288668804402],
          [0.050203235235130705, 310.53619724086366],
          [360.15706727788256, 33.05711026051813],
          [437.5142884049146, 133.44977990009465]
        ],
        [
          [248.90769330706507, 415.2041489551161],
          [198.9532321622869, 352.62160512937635],
          [339.546160777576, 240.3979259789976],
          [389.5006219223542, 302.98046980473737]
        ]
      ]
      // inputStream: {
      //   type: 'LiveStream',
      //   constraints: {
      //     width: 640,
      //     height: 480,
      //     facingMode: 'environment'
      //   },
      //   area: { // defines rectangle of the detection/localization area
      //     top: '40%',    // top offset
      //     right: '0%',  // right offset
      //     left: '0%',   // left offset
      //     bottom: '40%'  // bottom offset
      //   },
      // },
      // // locator: {
      // //   patchSize: 'medium',
      // //   halfSample: true,
      // // },
      // numOfWorkers: 4,
      // locate: true,
      // decoder: {
      //   readers: ['code_128_reader'],
      // },
    },
      (err) => {
        if (err) {
          this.errorMessage = `QuaggaJS could not be initialized, err: ${err}`;
        } else {
          Quagga.start();
          Quagga.onDetected((res) => {
            console.log(res);

            this.onBarcodeScanned(res.codeResult.code);
          });
        }
      });
  }

  onBarcodeScanned(code: string): void {

    // ignore duplicates for an interval of 1.5 seconds
    const now = new Date().getTime();
    if (this.lastScannedCode.filter(x => x === code).length > 0) {
      return;
    }

    this.lastScannedCode.push(code);
    this.lastScannedCodeDate = now;
    //this.beepService.beep();
    this.changeDetectorRef.detectChanges();
  }

}
