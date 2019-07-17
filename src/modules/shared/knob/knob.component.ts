import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-knob',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.scss']
})
export class KnobComponent implements OnInit {

  @Output() value = new EventEmitter<number>();

  private knobValue = 0;
  private dragCoordinates: {
    original: number;
    screenX: number;
    screenY: number
  };

  constructor() { }

  ngOnInit() {
  }

  mouseDown(event: MouseEvent) {
    this.dragCoordinates = {
      original: this.knobValue,
      screenX: event.screenX,
      screenY: event.screenY
    };
  }

  mouseMove(event: MouseEvent) {
    if (this.dragCoordinates) {
      this.knobValue = this.dragCoordinates.original + (this.dragCoordinates.screenY - event.screenY);

      // Knob goes from 0 to 100
      this.knobValue = Math.min(this.knobValue, 100);
      this.knobValue = Math.max(this.knobValue, 0);

      this.value.emit(this.knobValue);
    }
  }

  mouseUp(event: MouseEvent) {
    if (this.dragCoordinates) {
      this.dragCoordinates = null;
    }
  }

}
