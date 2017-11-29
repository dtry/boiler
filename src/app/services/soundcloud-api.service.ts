import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Track, TrackData, createTrack} from '../models/track';
import {SearchData} from '../models/search';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class SoundcloudApiService {

  trackList$: Subject<Track[]> = new Subject<Track[]>();

  // private PLAY_LIST_DEFAULT = 'https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud%3Agenres%3Adeephouse' +
  //   '&high_tier_only=false&client_id=0U89KnefZ29oWNFitwxnMmKoGkGazKaF&limit=50&offset=0&linked_partitioning=1';
  //q=pop%20indonesia%2080an&query_urn=soundcloud%3Asearch-autocomplete%3A03794272fc414c8ca7c13eb39c487feb

  private CLIENT_ID_PARAM = 'client_id=I16k8POQH5vn1kh8upgNMjkUs58RmGlg';
  private SERVER_PROXY_PATH_V_2 = 'http://localhost:3001';
  private SERVER_PROXY_PATH_V_1 = 'http://api.soundcloud.com';
  private PLAY_LIST_DEFAULT = '/users/277705034/favorites?';
  private SEARCH_QUERY = '/search/queries?limit=10&offset=0&linked_partitioning=1&';
  private TRACKS_BY_QUERY = '/tracks?limit=50&offset=0&linked_partitioning=1&';

  constructor(private http: HttpClient) {
  }

  getDefaultTracklist(): void {
    const path = this.SERVER_PROXY_PATH_V_1 + this.PLAY_LIST_DEFAULT + this.CLIENT_ID_PARAM;
    this.http.get<TrackData[]>(path)
      .subscribe(response => this.trackList$.next(response.map(item => createTrack(item))));
  }

  search(query: string): Observable<SearchData> {
    const path = this.SERVER_PROXY_PATH_V_2 + this.SEARCH_QUERY + this.CLIENT_ID_PARAM + `&q=${query}%20`;

    return this.http.get<SearchData>(path)
      .map(response => response);
  }

  loadTracks(query: string) {
    const path = this.SERVER_PROXY_PATH_V_1 + this.TRACKS_BY_QUERY + this.CLIENT_ID_PARAM + `&q=${query}%20`;

    this.http.get<TrackData[]>(path)
      .subscribe(response => this.trackList$.next(response.collection.map(item => createTrack(item))));
  }

  getTrackListObs(): Observable<Track[]> {
    return this.trackList$.asObservable();
  }

}
