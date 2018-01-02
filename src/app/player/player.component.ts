import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PlayerService} from '../services/player.service';
import {Track} from '../models/track';
import {Times} from '../models/times';
import {SoundcloudApiService} from '../services/soundcloud-api.service';
import {Router, ActivatedRoute, RoutesRecognized} from '@angular/router';

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
  isMonitor: boolean;

  constructor(private playerService: PlayerService,
              private apiService: SoundcloudApiService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isPlaying = false;
    this.isMonitor = false;
    this.volume = this.playerService.getVolume();

    this.playerService.getTrack().subscribe(track => this.track = track);
    this.playerService.getPlay().subscribe(isPlaying => this.isPlaying = isPlaying);
    this.playerService.timeToObservable().subscribe(times => this.times = times);

    // load track if this track is undefined and params in rout not empty.
    // TODO: add clear in destroy step.
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        const id = +val.state.root.firstChild.params['id'];
        if (!id || this.track.id) {
          return;
        }
        this.isMonitor = true;
        this.apiService.loadTrackById(id).subscribe(track => {
          this.track = track;
          this.playerService.setTrack(this.track);
        });
      }
    });
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
    if (!this.isMonitor) {
      this.router.navigate(['/tracks/' + this.track.id]);
    } else {
      this.router.navigate(['/tracks']);
    }

    this.isMonitor = !this.isMonitor;
  }
}
