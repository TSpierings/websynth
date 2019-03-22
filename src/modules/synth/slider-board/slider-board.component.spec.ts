import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderBoardComponent } from './slider-board.component';

describe('SliderBoardComponent', () => {
  let component: SliderBoardComponent;
  let fixture: ComponentFixture<SliderBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
