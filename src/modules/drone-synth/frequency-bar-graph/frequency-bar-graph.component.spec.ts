import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyBarGraphComponent } from './frequency-bar-graph.component';

describe('FrequencyBarGraphComponent', () => {
  let component: FrequencyBarGraphComponent;
  let fixture: ComponentFixture<FrequencyBarGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrequencyBarGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequencyBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
