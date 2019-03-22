import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SynthModule } from 'src/modules/synth/synth.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SynthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
