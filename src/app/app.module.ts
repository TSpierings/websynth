import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DroneSynthModule } from 'src/modules/drone-synth/drone-synth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DroneSynthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
