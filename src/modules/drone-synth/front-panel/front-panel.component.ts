import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front-panel',
  templateUrl: './front-panel.component.html',
  styleUrls: ['./front-panel.component.scss']
})
export class FrontPanelComponent implements OnInit {

  public oscillatorBank: Array<number>;

  constructor() { }

  ngOnInit() {
    this.oscillatorBank = [];

    for (let i = 0; i < 10; i++) {
      this.oscillatorBank.push(i);
    }
  }

}
