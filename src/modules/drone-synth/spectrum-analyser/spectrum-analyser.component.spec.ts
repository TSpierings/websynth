import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectrumAnalyserComponent } from './spectrum-analyser.component';

describe('SpectrumAnalyserComponent', () => {
  let component: SpectrumAnalyserComponent;
  let fixture: ComponentFixture<SpectrumAnalyserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpectrumAnalyserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectrumAnalyserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
