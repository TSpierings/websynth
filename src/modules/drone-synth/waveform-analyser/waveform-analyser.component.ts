import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-waveform-analyser',
  templateUrl: './waveform-analyser.component.html',
  styleUrls: ['./waveform-analyser.component.scss']
})
export class WaveformAnalyserComponent implements OnInit {

  @Input() audioContext: AudioContext;
  @Input() source: AudioNode;

  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;

  private analyserNode: AnalyserNode;
  private canvasContext: CanvasRenderingContext2D;
  private dataArray: Uint8Array;
  private bufferLength: number;

  constructor() { }

  ngOnInit() {
    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = 2048;

    this.source.connect(this.analyserNode);

    this.bufferLength = this.analyserNode.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.canvasContext = this.canvas.nativeElement.getContext('2d');
    this.draw();
  }

  draw() {
    requestAnimationFrame(this.draw.bind(this));

    this.analyserNode.getByteTimeDomainData(this.dataArray);
    const canvasHeight = this.canvas.nativeElement.height;
    const canvasWidth = this.canvas.nativeElement.width;

    this.canvasContext.fillStyle = 'rgb(200, 200, 200)';
    this.canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
    this.canvasContext.lineWidth = 2;
    this.canvasContext.strokeStyle = 'rgb(0, 0, 0)';
    this.canvasContext.beginPath();

    const sliceWidth = canvasWidth * ( 1.0 / this.bufferLength);
    let x = 0;

    for (let i = 0; i < this.bufferLength; i++) {
      const v = this.dataArray[i] / 128.0;
      const y = v * this.canvas.nativeElement.height / 2;

      if (i === 0) {
        this.canvasContext.moveTo(x, y);
      } else {
        this.canvasContext.lineTo(x, y);
      }

      x += sliceWidth;
    }

    this.canvasContext.lineTo(canvasWidth, canvasHeight / 2);
    this.canvasContext.stroke();
  }

}
