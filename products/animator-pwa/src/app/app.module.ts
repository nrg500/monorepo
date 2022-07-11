import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {WebcamModule} from "ngx-webcam";
import { NgxOpenCVModule, OpenCVConfig } from 'ngx-opencv';
import {HttpClientModule} from "@angular/common/http";
import { GameComponent } from './game/game.component';
import {MatCardModule} from "@angular/material/card";
import { RainComponent } from './rain/rain.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MuteButtonComponent } from './mute-button/mute-button.component';

const openCVConfig: OpenCVConfig = {
  openCVDirPath: 'assets/opencv'
};
@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    RainComponent,
    MainMenuComponent,
    MuteButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    WebcamModule,
    NgxOpenCVModule.forRoot(openCVConfig),
    HttpClientModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
