import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-frequency-bar-graph',
  templateUrl: './frequency-bar-graph.component.html',
  styleUrls: ['./frequency-bar-graph.component.scss']
})
export class FrequencyBarGraphComponent implements OnInit {

  @Input() audioContext: AudioContext;
  @Input() source: AudioNode;

  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;

  private analyserNode: AnalyserNode;
  private canvasContext: CanvasRenderingContext2D;
  private dataArray: Uint8Array;
  private bufferLength: number;
  private backgroundColorValue = 255;

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

    this.analyserNode.getByteFrequencyData(this.dataArray);
    const canvasHeight = this.canvas.nativeElement.height;
    const canvasWidth = this.canvas.nativeElement.width;

    this.canvasContext.fillStyle = `rgb(${this.backgroundColorValue}, ${this.backgroundColorValue}, ${this.backgroundColorValue})`;
    this.canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
    this.canvasContext.lineWidth = 2;
    this.canvasContext.strokeStyle = 'rgb(0, 0, 0)';
    this.canvasContext.beginPath();

    const barWidth = (canvasWidth / this.bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < this.bufferLength; i++) {
      const barHeight = this.dataArray[i];

      this.canvasContext.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
      this.canvasContext.fillRect(x, canvasHeight - barHeight / 2, barWidth, barHeight);

      x += barWidth + 1;
    }
  }

}
