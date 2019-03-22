import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OscillatorComponent } from './oscillator/oscillator.component';
import { SliderBoardComponent } from './slider-board/slider-board.component';
import { FrontPanelComponent } from './front-panel/front-panel.component';

@NgModule({
  declarations: [OscillatorComponent, SliderBoardComponent, FrontPanelComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FrontPanelComponent
  ]
})
export class SynthModule { }
