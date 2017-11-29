import {Component, ViewEncapsulation} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';

import {SoundcloudApiService} from '../services/soundcloud-api.service';
import {SearchData, SearchDataCollection} from '../models/search';
import {
  FormControl,
  FormGroup,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent {

  public searchHelper: SearchData;
  public searchForm: FormGroup;
  public searchField: FormControl;

  constructor(private apiService: SoundcloudApiService, private formBuilder: FormBuilder) {
    this.searchField = new FormControl();
    this.searchForm = formBuilder.group({search: this.searchField});

    this.searchField
      .valueChanges
      .debounceTime(400)
      .switchMap((value: string) => this.apiService.search(value))
      .subscribe(response => this.searchHelper = response);
  }

  onEnter() {
    this.loadTracks();
  }

  setValue(item: SearchDataCollection): void {
    this.searchField.setValue(item.output, {emitEvent: false});
    this.searchHelper = null;
    this.loadTracks();
  }

  loadTracks() {
    this.searchHelper = null;
    this.apiService.loadTracks(this.searchField.value);
  }
}
