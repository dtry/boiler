import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Track} from '../models/track';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PlayerService {

  track$: Subject<any> = new Subject<Track>();
  isPlay$: Subject<boolean> = new Subject<boolean>();
  audio = new Audio();

  constructor() {
  }

  setPlay(isPlay: boolean) {
    this.isPlay$.next(isPlay);
  }

  getPlay(): Observable<boolean> {
    return this.isPlay$.asObservable();
  }

  setTrack(track: Track) {
    this.audio.src = track.stream_url + '?client_id=0U89KnefZ29oWNFitwxnMmKoGkGazKaF';
    this.audio.play();

    this.track$.next(track);
  }

  getTrack(): Observable<Track> {
    return this.track$.asObservable();
  }
}
