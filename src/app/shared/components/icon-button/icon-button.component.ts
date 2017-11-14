import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class IconButtonComponent implements OnInit {
  @Input() className: string;
  @Input() label: string;

  @Output() onClick = new EventEmitter(false);

  constructor() { }

  ngOnInit() {
  }
}
