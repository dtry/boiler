import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PlayerService} from '../services/player.service';
import {Track} from '../models/track';
import {Times} from '../models/times';
import {SoundcloudApiService} from '../services/soundcloud-api.service';
import {Router, ActivatedRoute, NavigationEnd, RoutesRecognized} from '@angular/router';

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
  trackCardView: boolean;

  constructor(private playerService: PlayerService,
              private apiService: SoundcloudApiService,
              private router: Router,
              private route: ActivatedRoute) {

    this.isPlaying = false;
    this.trackCardView = true;
    this.volume = this.playerService.getVolume();

    this.playerService.getTrack().subscribe(track => this.track = track);
    this.playerService.getPlay().subscribe(isPlaying => this.isPlaying = isPlaying);
    this.playerService.timeToObservable().subscribe(times => this.times = times);

    // load track if this track is undefined and params in rout not empty.
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        const id = +val.state.root.firstChild.params['id'];
        if (!id || this.track.id) {
          return;
        }
        this.apiService.loadTrackById(id).subscribe(track => {
          this.track = track;
          this.playerService.setTrack(this.track);
        });
      }
    });
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
    if (this.trackCardView) {
      this.router.navigate(['/tracks/' + this.track.id]);
    } else {
      this.router.navigate(['/tracks']);
    }

    this.trackCardView = !this.trackCardView;
  }
}
