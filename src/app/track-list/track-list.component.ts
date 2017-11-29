import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SoundcloudApiService} from '../services/soundcloud-api.service';
import {Track} from '../models/track';
import {PlayerService} from '../services/player.service';
import {IconButtonComponent} from '../shared/components/icon-button/icon-button.component';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [IconButtonComponent]
})
export class TrackListComponent implements OnInit {

  trackList: Track[];
  isPlaying: boolean;
  selectedTrackId: number;

  constructor(private apiService: SoundcloudApiService, private playerService: PlayerService) {
    this.apiService.getTrackListObs()
      .subscribe(tracks => this.trackList = tracks);

    this.playerService.getPlay().subscribe(isPlaying => this.isPlaying = isPlaying);
  }

  ngOnInit() {
    this.apiService.getDefaultTracklist();
  }

  onClick(track: Track): void {
    this.selectedTrackId = track.id;
    this.playerService.setTrack(track);
    this.playerService.setPlay(!this.isPlaying);
  }
}
