import {Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input, ChangeDetectionStrategy} from '@angular/core';
import {Times} from "../../../models/times";

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeLineComponent implements OnInit {

  @Input() times: Times;
  @Output() seek = new EventEmitter(false);

  ngOnInit(): void {
  }

  onClick(event: any): void {
    const { currentTarget, pageX } = event;
    const seekValue = (pageX - currentTarget.getBoundingClientRect().left) / currentTarget.offsetWidth * this.times.duration;

    this.seek.emit(seekValue);
  }
}
