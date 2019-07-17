import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-knob',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.scss']
})
export class KnobComponent {

  @Output() valueChanged = new EventEmitter<number>();

  public knobValue = 0;

  private dragCoordinates: {
    original: number;
    screenX: number;
    screenY: number
  };

  constructor() { }

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
      this.limitAndEmitKnobValue();
    }
  }

  touchStart(event: TouchEvent) {
    this.dragCoordinates = {
      original: this.knobValue,
      screenX: event.touches[0].screenX,
      screenY: event.touches[0].screenY
    };
  }

  touchMove(event: TouchEvent) {
    event.preventDefault();

    if (this.dragCoordinates) {
      this.knobValue = this.dragCoordinates.original + (this.dragCoordinates.screenY - event.touches[0].screenY);
      this.limitAndEmitKnobValue();
    }
  }

  interactionEnd() {
    if (this.dragCoordinates) {
      this.dragCoordinates = null;
    }
  }

  private limitAndEmitKnobValue() {
      // Knob goes from 0 to 100
      this.knobValue = Math.min(this.knobValue, 100);
      this.knobValue = Math.max(this.knobValue, 0);

      this.valueChanged.emit(this.knobValue);
  }
}
