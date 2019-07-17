import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-oscillator',
  templateUrl: './oscillator.component.html',
  styleUrls: ['./oscillator.component.scss']
})
export class OscillatorComponent implements OnInit {

  @Input() number: number;

  constructor() { }

  ngOnInit() {
  }

}
