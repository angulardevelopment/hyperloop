import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SearchComponent } from './search/search.component';
import { HttmapComponent } from './httmap/httmap.component';
import { AppRoutingModule } from './app_routing.module';
import {NgForm} from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SocialComponent } from './social/social.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HttmapComponent,
    SocialComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot([]),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
