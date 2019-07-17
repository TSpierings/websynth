import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontPanelComponent } from './front-panel/front-panel.component';
import { OscillatorComponent } from './oscillator/oscillator.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FrontPanelComponent, OscillatorComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    FrontPanelComponent
  ]
})
export class DroneSynthModule { }
