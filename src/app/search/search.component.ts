import {Component, ElementRef, OnDestroy, Renderer2, ViewEncapsulation} from '@angular/core';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';

import {SoundcloudApiService} from '../services/soundcloud-api.service';
import {SearchData, SearchDataCollection} from '../models/search';
import {
  FormControl,
  FormGroup,
  FormBuilder
} from '@angular/forms';

import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SearchComponent implements OnDestroy {

  public searchHelper: SearchData;
  public searchForm: FormGroup;
  public searchField: FormControl;

  private documentClickHelper: Function;
  private documentKeyPressHelper: Function;

  private selectedLiValue: number;

  constructor(private apiService: SoundcloudApiService,
              private formBuilder: FormBuilder,
              private router: Router,
              private renderer: Renderer2) {

    this.selectedLiValue = -1;
    this.searchField = new FormControl();
    this.searchForm = formBuilder.group({search: this.searchField});

    // listen changes in input element and send query after change to service.
    // when response is not empty - filled in list on result.
    this.searchField
      .valueChanges
      .debounceTime(400)
      .switchMap((value: string) => {
        this.selectedLiValue = -1; // reset active item.
        return this.apiService.search(value);
      })
      .subscribe(response => this.searchHelper = response);

    // remove all search result items and hide it list when click was by component in out side.
    this.documentClickHelper = this.renderer.listen('document', 'click', (event) => {
      this.searchHelper = null;
    });
    // walk on the search result list. buttons(top and bottom arrow)
    this.documentKeyPressHelper = this.renderer.listen('document', 'keydown', this.onKeyPress.bind(this));
  }

  ngOnDestroy() {
    // remove listeners
    this.documentClickHelper();
    this.documentKeyPressHelper();
  }

  onKeyPress(event) {
    // TODO: Add esc listener for clear field.

    if (!this.isSearchCollectionNotEmpty()) {
      return;
    }

    if (event.keyCode === 40 && this.selectedLiValue < this.searchHelper.collection.length - 1) {
      // Arrow Down
      this.selectedLiValue++;
    } else if (event.keyCode === 38 && this.selectedLiValue > 0) {
      // Arrow Up
      this.selectedLiValue--;
    }
  }

  isSearchCollectionNotEmpty() {
    return this.searchHelper && this.searchHelper.collection.length;
  }

  onEnter() {
    if (this.isSearchCollectionNotEmpty()) {
      this.setValue(this.searchHelper.collection[this.selectedLiValue]);
    }
  }

  onEsc() {
    this.searchField.setValue(null, {emitEvent: false});
    this.searchHelper = null;
  }

  setValue(item: SearchDataCollection): void {
    this.searchField.setValue(item.output, {emitEvent: false});
    this.searchHelper = null;
    this.loadTracks();
  }

  loadTracks() {
    this.searchHelper = null;
    this.apiService.loadTracks(this.searchField.value);

    // if current view is not track card view then redirect to track card view.
    if (this.router.url !== '/tracks') { // TODO: move to some constants
      this.router.navigate(['/tracks/']);
    }
  }
}
