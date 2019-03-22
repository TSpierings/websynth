import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OscillatorComponent } from './oscillator/oscillator.component';
import { AppComponent } from './app/app.component';
import { SliderBoardComponent } from './slider-board/slider-board.component';

@NgModule({
  declarations: [OscillatorComponent, AppComponent, SliderBoardComponent],
  imports: [
    CommonModule
  ]
})
export class SynthModule { }
