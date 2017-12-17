import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-volume-line',
  templateUrl: './volume-line.component.html',
  styleUrls: ['./volume-line.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VolumeLineComponent implements OnInit {
  @Input() value: number;
  @Output() volume = new EventEmitter(false);

  constructor() {
  }

  ngOnInit() {
  }

  onClick(event: any): void {
    const {currentTarget, pageX} = event;
    const value = (pageX - currentTarget.getBoundingClientRect().left + 5) / currentTarget.offsetWidth;

    this.value = value;
    this.volume.emit(value);
  }
}
