import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

import {Track} from '../models/track';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class SoundcloudApiService {

  // private PLAY_LIST_DEFAULT = 'https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud%3Agenres%3Adeephouse' +
  //   '&high_tier_only=false&client_id=0U89KnefZ29oWNFitwxnMmKoGkGazKaF&limit=50&offset=0&linked_partitioning=1';

  private PLAY_LIST_DEFAULT = 'http://api.soundcloud.com/users/277705034/favorites?client_id=I16k8POQH5vn1kh8upgNMjkUs58RmGlg';

  constructor(private http: HttpClient) {
  }

  getDefaultTracklist(): Observable<Track[]> {
    return this.http.get<Track[]>(this.PLAY_LIST_DEFAULT);

  }
}
