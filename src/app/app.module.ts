import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {SoundcloudApiService} from './services/soundcloud-api.service';
import {PlayerService} from './services/player.service';

import {AppComponent} from './app.component';
import {TrackListComponent} from './track-list/track-list.component';
import {PlayerComponent} from './player/player.component';
import {IconButtonComponent} from './shared/components/icon-button/icon-button.component';
import { TimeLineComponent } from './shared/components/time-line/time-line.component';
import {FormatTimePipe} from './shared/pipes/format-time/format-time';
import { VisualizationComponent } from './visualization/visualization.component';


@NgModule({
  declarations: [
    FormatTimePipe,
    AppComponent,
    TrackListComponent,
    PlayerComponent,
    IconButtonComponent,
    TimeLineComponent,
    VisualizationComponent
  ],
  exports: [
    IconButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    SoundcloudApiService,
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
