import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Quagga from 'quagga';
import { BeepService } from './beep.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bar-code-reader';


}
