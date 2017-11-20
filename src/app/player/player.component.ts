import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PlayerService} from '../services/player.service';
import {Track} from '../models/track';
import {Times} from "../models/times";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerComponent implements OnInit {
  track: Track;
  isPlaying: boolean;
  times: Times;

  constructor(private playerService: PlayerService) {
    this.isPlaying = false;

    this.playerService.getTrack().subscribe(track => this.track = track);
    this.playerService.getPlay().subscribe(isPlaying => this.isPlaying = isPlaying);
    this.playerService.timeToObservable().subscribe(times => this.times = times);
  }

  ngOnInit() {
  }

  onPlay() {
    this.playerService.setPlay(!this.isPlaying);
  }

}
