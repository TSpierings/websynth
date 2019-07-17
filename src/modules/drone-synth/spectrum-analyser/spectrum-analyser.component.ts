import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-spectrum-analyser',
  templateUrl: './spectrum-analyser.component.html',
  styleUrls: ['./spectrum-analyser.component.scss']
})
export class SpectrumAnalyserComponent implements OnInit {

  @Input() audioContext: AudioContext;
  @Input() destination: AudioNode;
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
    this.analyserNode.connect(this.destination);

    this.bufferLength = this.analyserNode.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.canvasContext = this.canvas.nativeElement.getContext('2d');
    this.draw();
  }

  draw() {
    requestAnimationFrame(this.draw.bind(this));

    this.analyserNode.getByteTimeDomainData(this.dataArray);

    this.canvasContext.fillStyle = 'rgb(200, 200, 200)';
    this.canvasContext.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.canvasContext.lineWidth = 2;
    this.canvasContext.strokeStyle = 'rgb(0, 0, 0)';
    this.canvasContext.beginPath();
    this.canvasContext.lineTo(this.canvas.nativeElement.width, this.canvas.nativeElement.height / 2);

    const sliceWidth = this.canvas.nativeElement.width * ( 1.0 / this.bufferLength);
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

    this.canvasContext.lineTo(this.canvas.nativeElement.width, this.canvas.nativeElement.height / 2);
    this.canvasContext.stroke();
  }

}
