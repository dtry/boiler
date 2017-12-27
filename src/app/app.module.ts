import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {HttpClientModule} from '@angular/common/http';

import {SoundcloudApiService} from './services/soundcloud-api.service';
import {PlayerService} from './services/player.service';

import {AppComponent} from './app.component';
import {TrackListComponent} from './track-list/track-list.component';
import {PlayerComponent} from './player/player.component';
import {IconButtonComponent} from './shared/components/icon-button/icon-button.component';
import {TimeLineComponent} from './shared/components/time-line/time-line.component';
import {FormatTimePipe} from './shared/pipes/format-time/format-time';
import {VisualizationComponent} from './visualization/visualization.component';
import {SearchComponent} from './search/search.component';
import {HeaderComponent} from './header/header.component';
import {VolumeLineComponent} from './shared/components/volume-line/volume-line.component';

const routes: Routes = [
  {path: 'tracks/:id', component: VisualizationComponent},
  {path: 'tracks', component: TrackListComponent},
  {path: '', redirectTo: '/tracks', pathMatch: 'full'},
  {path: '**', component: TrackListComponent}
];

@NgModule({
  declarations: [
    FormatTimePipe,
    AppComponent,
    TrackListComponent,
    PlayerComponent,
    IconButtonComponent,
    TimeLineComponent,
    VisualizationComponent,
    SearchComponent,
    HeaderComponent,
    VolumeLineComponent
  ],
  exports: [
    IconButtonComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    SoundcloudApiService,
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
