import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PlayerService} from '../services/player.service';
import {Track} from '../models/track';

import {IconButtonComponent} from '../shared/components/icon-button/icon-button.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [IconButtonComponent]
})
export class PlayerComponent implements OnInit {
  private track: Track;
  private isPlaying: boolean;

  constructor(private playerService: PlayerService) {
    this.isPlaying = false;

    this.playerService.getTrack().subscribe(track => this.track = track);
    this.playerService.getPlay().subscribe(isPlaying => this.isPlaying = isPlaying);
  }

  ngOnInit() {
  }

  onPlay() {
    this.isPlaying = !this.isPlaying;



  }

}
