import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveformAnalyserComponent } from './waveform-analyser.component';

describe('waveformAnalyserComponent', () => {
  let component: WaveformAnalyserComponent;
  let fixture: ComponentFixture<WaveformAnalyserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaveformAnalyserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveformAnalyserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
