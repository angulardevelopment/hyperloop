import { Component, ElementRef, NgZone, OnInit, ViewChild, NgModule, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery';
import * as Clipboard from 'clipboard';
import { AppSettings } from './const/app_config';
import { countryUnitSystem } from './const/country_Array';
import { MatSnackBar } from '@angular/material';
import { MapCss } from './const/map_css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


}

