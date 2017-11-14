import {Component, OnInit, ViewEncapsulation} from '@angular/core';
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
export class TrackListComponent implements OnInit {

  playList: Track[] = [];

  constructor(private apiService: SoundcloudApiService, private playerService: PlayerService) {
  }

  ngOnInit() {
    this.getDefaultTracklist();
  }

  getDefaultTracklist(): void {
    this.apiService.getDefaultTracklist()
      .subscribe(playList => this.playList = playList);
  }

  onClick(track: Track): void {
    this.playerService.setTrack(track);
  }
}
