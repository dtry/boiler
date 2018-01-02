import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {SoundcloudApiService} from '../services/soundcloud-api.service';
import {Track} from '../models/track';
import {PlayerService} from '../services/player.service';
import {IconButtonComponent} from '../shared/components/icon-button/icon-button.component';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [IconButtonComponent]
})

export class TrackListComponent implements OnInit, OnDestroy {

  trackList: Track[];
  isPlaying: boolean;
  selectedTrackId: number;

  trackListSubscription: any;
  trackSubscription: any;
  playSubscription: any;

  constructor(private apiService: SoundcloudApiService,
              private playerService: PlayerService) {
  }

  ngOnInit() {
    const track$: any = this.playerService.getTrack();
    const isPlay$: any = this.playerService.getPlay();

    // Subscribe
    this.trackListSubscription = this.apiService.getTrackListObs().subscribe(tracks => this.trackList = tracks);
    this.playSubscription = isPlay$.subscribe(isPlaying => this.isPlaying = isPlaying);
    this.trackSubscription = track$.subscribe(track => this.selectedTrackId = track.id);

    // Apply values from services
    this.trackList = this.apiService.getTracks();
    this.selectedTrackId = track$.source.getValue().id;
    this.isPlaying = isPlay$.source.getValue();
  }

  ngOnDestroy() {
    this.trackListSubscription.unsubscribe();
    this.playSubscription.unsubscribe();
    this.trackSubscription.unsubscribe();
  }

  onClick(track: Track): void {
    this.selectedTrackId = track.id;
    this.playerService.setTrack(track);
    this.playerService.setPlay(true);
  }
}
