import 'rxjs/add/observable/fromEvent';

import {Injectable} from '@angular/core';

import {Track} from '../models/track';
import {Times} from '../models/times';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {SoundcloudApiService} from '../services/soundcloud-api.service';

@Injectable()
export class PlayerService {

  time$: Observable<Times>;
  track$: BehaviorSubject<any> = new BehaviorSubject({});
  isPlay$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  bounds$: Subject<Uint8Array> = new Subject<Uint8Array>();

  audio = new Audio();
  context;
  node;
  analyser;
  bands;
  source;

  constructor(private apiService: SoundcloudApiService) {
    this.isPlay$.asObservable().subscribe(isPlay => isPlay ? this.play() : this.pause());
    this.time$ = Observable.fromEvent(this.audio, 'timeupdate', this.getTimes);

    Observable.fromEvent(this.audio, 'ended').subscribe(() => this.onNext());
    this.audio.volume = 0.5;

    this.initAudioContext();
  }

  initAudioContext() {
    this.audio.crossOrigin = 'anonymous';
    this.context = new AudioContext();
    this.node = this.context.createScriptProcessor(2048, 1, 1);

    this.analyser = this.context.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.3;
    this.analyser.fftSize = 2048;

    this.source = this.context.createMediaElementSource(this.audio);
    this.source.connect(this.analyser);
    this.analyser.connect(this.node);
    this.node.connect(this.context.destination);
    this.source.connect(this.context.destination);

    this.bands = new Uint8Array(this.analyser.frequencyBinCount);

    this.node.onaudioprocess = () => {
      this.analyser.getByteFrequencyData(this.bands);
      if (!this.audio.paused) {
        this.bounds$.next(this.bands);
      }
    };

  }

  getContext() {
    return {
      audio: this.audio,
      analyser: this.analyser,
      node: this.node
    };
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

  getBounds() {
    return this.bounds$.asObservable();
  }

  onNext() {
    this.setTrack(this.apiService.getNextTrack(this.track$.getValue().id));
    this.play();
  }

  setVolume(value: number) {
    this.audio.volume = value;
  }

  getVolume(): number {
    return this.audio.volume;
  }
}
