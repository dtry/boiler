import 'rxjs/add/observable/fromEvent';

import {Injectable} from '@angular/core';

import {Track} from '../models/track';
import {Times} from '../models/times';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class PlayerService {

  time$: Observable<Times>;

  track$: Subject<any> = new Subject<Track>();
  isPlay$: Subject<boolean> = new Subject<boolean>();
  audio = new Audio();

  constructor() {
    this.isPlay$.asObservable().subscribe(isPlay => isPlay ? this.play() : this.pause());

    this.time$ = Observable.fromEvent(this.audio, 'timeupdate', this.getTimes);
  }

  setPlay(isPlay: boolean) {
    this.isPlay$.next(isPlay);
  }

  getPlay(): Observable<boolean> {
    return this.isPlay$.asObservable();
  }

  setTrack(track: Track) {
    this.audio.src = track.streamUrl;
    this.track$.next(track);
  }

  getTrack(): Observable<Track> {
    return this.track$.asObservable();
  }

  pause(): void {
    this.audio.pause();
  }

  play(): void {
    this.audio.play();
  }

  timeToObservable(): Observable<Times> {
    return this.time$;
  }

  private getTimes(event: Event): Times {
    const {buffered, currentTime, duration} = event.target as HTMLAudioElement;
    const bufferedTime = buffered.length ? buffered.end(0) : 0;
    return {
      bufferedTime,
      currentTime,
      duration,
      percentBuffered: `${(bufferedTime / duration * 100) || 0}%`,
      percentCompleted: `${(currentTime / duration * 100) || 0}%`
    };
  }

  seek(time: number): void {
    this.audio.currentTime = time;
  }
}
