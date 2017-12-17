import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PlayerService} from '../services/player.service';
import {Track} from '../models/track';
import {Times} from '../models/times';
import {SoundcloudApiService} from '../services/soundcloud-api.service';

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
  volume: number;

  constructor(private playerService: PlayerService, private apiService: SoundcloudApiService) {
    this.isPlaying = false;

    this.playerService.getTrack().subscribe(track => this.track = track);
    this.playerService.getPlay().subscribe(isPlaying => this.isPlaying = isPlaying);
    this.playerService.timeToObservable().subscribe(times => this.times = times);
    this.volume = this.playerService.getVolume();
  }

  ngOnInit() {
  }

  onPlay() {
    this.playerService.setPlay(!this.isPlaying);
  }

  onNext() {
    this.playerService.setTrack(this.apiService.getNextTrack(this.track.id));
    this.isPlaying = true;
    this.playerService.setPlay(this.isPlaying);
  }

  onPreview() {
    this.playerService.setTrack(this.apiService.getPreviewTrack(this.track.id));
    this.isPlaying = true;
    this.playerService.setPlay(this.isPlaying);
  }

  onMonitor() {

  }
}
