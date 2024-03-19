import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  NgModule,
  Input,
  HostListener
} from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { ActivatedRoute, Router } from "@angular/router";
// import { Http, Response } from "@angular/http";
import { NgxSpinnerService } from "ngx-spinner";
import * as $ from "jquery";
import * as Clipboard from "clipboard";
import { AppSettings } from "../const/app_config";
import { ApplicationStateService } from "../application-state.service";
import { countryUnitSystem } from "../const/country_Array";
// import { MatSnackBar } from "@angular/material";
import { MapCss } from "../const/map_css";
import { HttService } from "../htt.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
//
declare var  google;
@Component({
  selector: "app-httmap",
  templateUrl: "./httmap.component.html",
  styleUrls: ["./httmap.component.css"],
  animations: [
    trigger("slideInOut", [
      state(
        "in",
        style({
          transform: "translate3d(0, 0, 0)"
        })
      ),
      state(
        "out",
        style({
          transform: "translate3d(-100%, 0, 0)"
        })
      ),
      transition("in => out", animate("400ms ease-in-out")),
      transition("out => in", animate("400ms ease-in-out"))
    ]),
    trigger("slideUpDown", [
      state(
        "enter",
        style({
          height: "50vh",
          transform: "translate3d(0, 0%, 0)"
        })
      ),
      state(
        "leave",
        style({
          height: "20vh",
          overflow: "hidden",
          transform: "translate3d(0, 0, 0)"
        })
      ),
      transition("enter => leave", animate("400ms 0.2ms ease-in-out")),
      transition("leave => enter", animate("400ms 0.2ms ease-in-out"))
    ]),

    trigger("UpDown", [
      state(
        "up",
        style({
          height: "92vh",
          transform: "translate3d(0, 0, 0)"
        })
      ),
      state(
        "down",
        style({
          height: "20vh",
          overflow: "hidden",
          transform: "translate3d(0, 0, 0)"
        })
      ),
      transition("up => down", animate("400ms 0.2ms ease-in-out")),
      transition("down => up", animate("400ms 0.2ms ease-in-out"))
    ])
  ]
})
export class HttmapComponent implements OnInit {
  form: FormGroup;

  @ViewChild("source") source: ElementRef;
  @ViewChild("destination") destination: ElementRef;

  hideShowAnimator: boolean = true;
  hideShowAnimation() {
    this.hideShowAnimator = !this.hideShowAnimator;
  }
  Arr = Array;
  num: number = 6;
  num1: number = 18;
  num2: number = 25;
  num3: number = 30;
  num4: number = 100;
  num5: number = 10;
  private mapProp: any;
  private map: any;
  private marker: any;
  public sourceLocation: any;
  public destinationLocation: any;
  public sourcelng;
  public sourcelat;
  public show: boolean = false;
  public showValue: boolean;
  public hyperloopSpeed: number;
  public hyperloopMiledSpeed: number;
  public hyperloopMinSpeed: number = 1200;
  public hyperloopMaxSpeed: number = 2000;
  hyperloopAvgTime: number = 1050;
  public drivingSpeed: number = 130;
  public publicTransportSpeed: number = 336;
  public airplanSpeed: any;
  public airplanAvgSpeed: number = 450;
  public airplaneMileSpeed: any;
  public destinationLatlang;
  public sourcelatlang;
  public distance: number;
  public hyperloopTime: number = 1.0;
  public drivingTime: any;
  public PTTime: any;
  public airplanTime: any = 0.0;
  public sidenavval: boolean = true;
  public transitDistance: number;
  public drivingDistance: number;
  public flightPath;
  public flightPathShadow;
  public refresh: boolean = true;
  autoDriveSteps: any = [];
  remainingSeconds = 0;
  public currentpos;
  public playroute: boolean = true;
  public param1: any;
  public miledistance;
  public transitmile;
  public drivingmile;
  public distInKms: boolean = true;
  public link;
  public converter: boolean = false;
  public converterForMobile: boolean = false;
  public showSpeedoMeter: boolean = false;
  public autocomplete: any;
  public autocompletedest: any;
  public animationMarker: any;
  menuState: string = "in";
  private visible: string = "leave";
  private toggle: string = "down";
  private shareflag: boolean = false;
  timetoggle: string = "timedown";
  arrow: string = "in";
  public hidebar: boolean = false;
  public errormsg: boolean = false;
  public message: string;
  public publicttime: any = 0.0;
  public dtime: any = 0.0;
  public emperialcarUnit: any;
  public emperialtrainUnit: any;
  public exceedlimit: boolean = true;
  public hdistanceInMiles: any;
  public countryName: any;
  public hdistance: any;
  public coEmissionTabClicked = false;
  public passengerInfoClick = false;
  public travelInfoClick = false;
  public active;
  public timesactive;
  public speedactive;
  public passactive;
  public co2active;
  public mobile: boolean;
  public mobilestate: boolean;
  public exceedDistMsg :boolean;

  public index: number = 0;

  resetSpeedoMeter() {
    this.canvas1 = undefined;
    this.ctx1 = undefined;
    this.x1 = undefined;
    this.y1 = undefined;
    this.radius1 = 88;
    this.circum1 = Math.PI * 2;
    this.start1 = Math.PI / -2;
    this.finish1 = 70;
    this.curr1 = 0;
    this.width1 = undefined;
    this.height1 = undefined;

    this.canvas2 = undefined;
    this.ctx2 = undefined;
    this.x2 = undefined;
    this.y2 = undefined;
    this.radius2 = 66;
    this.circum2 = Math.PI * 2;
    this.start2 = Math.PI / -2;
    this.finish2 = 40;
    this.curr2 = 0;
    this.width2 = undefined;
    this.height2 = undefined;

    this.canvas3 = undefined;
    this.ctx3 = undefined;
    this.x3 = undefined;
    this.y3 = undefined;
    this.radius3 = 44;
    this.circum3 = Math.PI * 2;
    this.start3 = Math.PI / -2;
    this.finish3 = 30;
    this.curr3 = 0;
    this.width3 = undefined;
    this.height3 = undefined;

    this.canvas4 = undefined;
    this.ctx4 = undefined;
    this.x4 = undefined;
    this.y4 = undefined;
    this.radius4 = 22;
    this.circum4 = Math.PI * 2;
    this.start4 = Math.PI / -2;
    this.finish4 = 16;
    this.curr4 = 0;
    this.width4 = undefined;
    this.height4 = undefined;
  }

  // Speedometer Guage
  startSpeedometer() {
    this.resetSpeedoMeter();
    this.set_animation1();
    this.animate1(undefined);
    this.set_animation2();
    this.animate2(undefined);
    this.set_animation3();
    this.animate3(undefined);
    this.set_animation4();
    this.animate4(undefined);
  }

  canvas1: any;
  ctx1: any;
  x1: any;
  y1: any;
  radius1 = 88;
  circum1 = Math.PI * 2;
  start1 = Math.PI / -2;
  finish1 = 65;
  curr1 = 0;
  width1: any;
  height1: any;

  set_animation1() {
    let bar_name;
    if (this.mobilestate) {
      bar_name = "bar1";
    } else {
      bar_name = "bar11";
    }
    this.canvas1 = <HTMLCanvasElement>document.getElementById(bar_name);
    this.width1 = this.canvas1.width;
    this.height1 = this.canvas1.height;
    this.x1 = this.height1 / 2;
    this.y1 = this.width1 / 2;
    this.ctx1 = this.canvas1.getContext("2d");
    this.ctx1.lineWidth = 10;
    this.ctx1.strokeStyle = "#58c8dc";
    this.ctx1.shadowOffsetX = 4;
    this.ctx1.shadowOffsetY = 4;
    // this.ctx1.shadowBlur = 10;
    this.ctx1.shadowColor = "#465362";
  }
  //Animate guage

  animate1(draw_to) {
    this.ctx1.clearRect(0, 0, this.width1, this.height1);
    // this.ctx1.shadowBlur = 100;
    this.ctx1.lineWidth = 1;
    this.ctx1.beginPath();
    // Staring point (10,45)
    this.ctx1.moveTo(50,100);
    // End point (180,47)
    this.ctx1.lineTo(180,100);
    // Make the line visible
    this.ctx1.stroke();
    this.ctx1.closePath();
    this.ctx1.fillText("1,200 km/h", 100, 96);
    this.ctx1.fillStyle = "white";
    this.ctx1.stroke();
    // this.ctx1.shadowBlur = 10;
    this.ctx1.lineWidth = 30;
    this.ctx1.beginPath();
    // this.ctx1.lineTo(75, 87);
    this.ctx1.stroke();
    this.ctx1.closePath();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    this.ctx1.arc(this.x1, this.y1, this.radius1, this.start1, draw_to, false);
    this.ctx1.stroke();
    // this.ctx1.fill()
    this.ctx1.closePath();
    this.curr1++;
    if (this.curr1 < this.finish1 + 1) {
      // Recursive repeat this function until the end is reached
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.animate1((this.circum1 * this.curr1) / 100 + this.start1);
        }, 120);
      });
    }
  }

  canvas2: any;
  ctx2: any;
  x2: any;
  y2: any;
  radius2 = 66;
  circum2 = Math.PI * 2;
  start2 = Math.PI / -2;
  finish2 = 40;
  curr2 = 0;
  width2: any;
  height2: any;
  set_animation2() {
    let bar_name;
    if (this.mobilestate) {
      bar_name = "bar2";
    } else {
      bar_name = "bar21";
    }
    this.canvas2 = <HTMLCanvasElement>document.getElementById(bar_name);
    this.width2 = this.canvas2.width;
    this.height2 = this.canvas2.height;
    this.x2 = this.height2 / 2;
    this.y2 = this.width2 / 2;
    this.ctx2 = this.canvas2.getContext("2d");
    // this.ctx2.lineWidth = 2;
    this.ctx2.strokeStyle = "#54adbf";
    this.ctx2.shadowOffsetX = 4;
    this.ctx2.shadowOffsetY = 4;
    this.ctx2.shadowBlur = 10;
    // this.ctx2.lineWidth = 2;
    this.ctx2.shadowColor = "#465362";
  }

  animate2(draw_to) {
    this.ctx2.clearRect(0, 0, this.width2, this.height2);
    this.ctx2.shadowBlur = 100;
    this.ctx2.lineWidth = 1;
    this.ctx2.beginPath();
    // Staring point (10,45)
    this.ctx2.moveTo(50,100);
    // End point (180,47)
    this.ctx2.lineTo(180,100);
    // Make the line visible
    this.ctx2.stroke();
    this.ctx2.fillText("450 km/h", 100, 95);
    this.ctx2.fillStyle = "white";
    this.ctx2.stroke();
    this.ctx2.shadowBlur = 10;
    this.ctx2.lineWidth = 30;
    this.ctx2.beginPath();
    // this.ctx2.lineTo(75, 109);
    this.ctx2.stroke();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    // Re-draw from the very beginning each time so there isn't tiny line spaces between each section (the browser paint rendering will probably be smoother too)
    this.ctx2.arc(this.x2, this.y2, this.radius2, this.start2, draw_to, false);
    // Draw
    this.ctx2.stroke();
    // Increment percent
    this.curr2++;
    // Animate until end
    if (this.curr2 < this.finish2 + 1) {
      // Recursive repeat this function until the end is reached
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.animate2((this.circum2 * this.curr2) / 100 + this.start2);
        }, 240);
      });
    }
    this.ctx2.lineWidth = 1;
    this.ctx2.beginPath();
    this.ctx2.arc(this.x2, this.y2, this.radius2, this.start2, draw_to, false);
    this.ctx2.stroke();
  }

  canvas3: any;
  ctx3: any;
  x3: any;
  y3: any;
  radius3 = 44;
  circum3 = Math.PI * 2;
  start3 = Math.PI / -2;
  finish3 = 40;
  curr3 = 0;
  width3: any;
  height3: any;
  set_animation3() {
    let bar_name;
    if (this.mobilestate) {
      bar_name = "bar3";
    } else {
      bar_name = "bar31";
    }
    this.canvas3 = <HTMLCanvasElement>document.getElementById(bar_name);
    // this.canvas3 = this.bar3;
    this.width3 = this.canvas3.width;
    this.height3 = this.canvas3.height;
    this.x3 = this.height3 / 2;
    this.y3 = this.width3 / 2;
    this.ctx3 = this.canvas3.getContext("2d");
    this.ctx3.lineWidth = 2;
    this.ctx3.strokeStyle = "#4d8596";
    this.ctx3.shadowOffsetX = 4;
    this.ctx3.shadowOffsetY = 4;
    this.ctx3.shadowBlur = 20;
    this.ctx3.shadowColor = "#465362";
  }

  animate3(draw_to) {
    // Clear off the canvas
    this.ctx3.clearRect(0, 0, this.width3, this.height3);
    this.ctx3.shadowBlur = 100;
    this.ctx3.fillText("250 km/h", 100, 95);
     this.ctx3.lineWidth = 1;
    // this.ctx3.lineTo(55, 95);
    this.ctx3.beginPath();
    // Staring point (10,45)
    this.ctx3.moveTo(50,100);
    // End point (180,47)
    this.ctx3.lineTo(180,100);
    // Make the line visible
    this.ctx3.stroke();
    this.ctx3.fillStyle = "white";
    this.ctx3.stroke();
    this.ctx3.shadowBlur = 10;
    this.ctx3.lineWidth = 30;
    this.ctx3.beginPath();
    // this.ctx3.lineTo(75, 129);
    this.ctx3.stroke();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    // Re-draw from the very beginning each time so there isn't tiny line spaces between each section (the browser paint rendering will probably be smoother too)
    this.ctx3.arc(this.x3, this.y3, this.radius3, this.start3, draw_to, false);
    // Draw
    this.ctx3.stroke();
    // Increment percent
    this.curr3++;
    // Animate until end
    if (this.curr3 < this.finish3 + 1) {
      // Recursive repeat this function until the end is reached
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.animate3((this.circum3 * this.curr3) / 100 + this.start3);
        }, 360);
      });
    }
  }

  canvas4: any;
  ctx4: any;
  x4: any;
  y4: any;
  radius4 = 22;
  circum4 = Math.PI * 2;
  start4 = Math.PI / -2;
  finish4 = 22;
  curr4 = 0;
  width4: any;
  height4: any;
  set_animation4() {
    let bar_name;
    if (this.mobilestate) {
      bar_name = "bar4";
    } else {
      bar_name = "bar41";
    }
    this.canvas4 = <HTMLCanvasElement>document.getElementById(bar_name);
    this.width4 = this.canvas4.width;
    this.height4 = this.canvas4.height;
    this.x4 = this.height4 / 2;
    this.y4 = this.width4 / 2;
    this.ctx4 = this.canvas4.getContext("2d");
    this.ctx4.lineWidth = 1;
    this.ctx4.strokeStyle = "#486c7c";
    this.ctx4.shadowOffsetX = 4;
    this.ctx4.shadowOffsetY = 4;
    this.ctx4.shadowBlur = 10;
    this.ctx4.shadowColor = "#465362";
  }

  animate4(draw_to) {
    this.ctx4.clearRect(0, 0, this.width4, this.height4);
    this.ctx4.shadowBlur = 100;
    this.ctx4.fillText("90 km/h", 100, 95);
    this.ctx4.lineWidth = 1;
    this.ctx4.beginPath();
    // Staring point (10,45)
    this.ctx4.moveTo(50,100);
    // End point (180,47)
    this.ctx4.lineTo(180,100);
    // Make the line visible
    this.ctx4.stroke();
    this.ctx4.fillStyle = "white";
    this.ctx4.stroke();
    this.ctx4.shadowBlur = 10;
    this.ctx4.lineWidth = 30;
    this.ctx4.beginPath();
    this.ctx4.stroke();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    // Re-draw from the very beginning each time so there isn't tiny line spaces between each section (the browser paint rendering will probably be smoother too)
    this.ctx4.arc(this.x4, this.y4, this.radius4, this.start4, draw_to, false);
    // Draw
    this.ctx4.stroke();
    // Increment percent
    this.curr4++;
    // Animate until end
    if (this.curr4 < this.finish4 + 1) {
      // Recursive repeat this function until the end is reached
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.animate4((this.circum4 * this.curr4) / 150 + this.start4);
        }, 480);
      });
    }
  }

  constructor(
    private httservice: HttService,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    element: ElementRef,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private applicationstateservice: ApplicationStateService,
    private router: Router
  ) {
    this.mobilestate = this.applicationstateservice.getIsMobileResolution();

    this.route.queryParams.subscribe(params => {
      this.param1 = params["src"];
      if (this.param1) {
        this.hidepopup = true;
        this.errormsg = false;
        this.param1 = this.param1.split(":");
        this.param1[0] = this.param1[0].replace(/_/g, " ");
        this.param1[1] = this.param1[1].replace(/_/g, " ");
        this.sourceLocation = this.param1[0];
        this.destinationLocation = this.param1[1];
        google.maps.event.trigger(this.autocomplete, "place_changed");
        google.maps.event.trigger(this.autocompletedest, "place_changed");
        this.source.nativeElement.value = this.param1[0];
        this.destination.nativeElement.value = this.param1[1];
        this.getRoutes();
      }
    });
  }

  openSnackBar(msg) {
    this.snackBar.open(msg, "Dismiss", {
      duration: 3000
    });
  }

  /* Speedometer Guage end*/

  getServiceData() {
    var service = this.httservice.returnToFrom();
    if (service[0] && service[1]) {
      this.sourceLocation = service[0];
      this.destinationLocation = service[1];
      this.source.nativeElement.value = service[0];
      this.form.controls["src"].setValue(this.sourceLocation);
      // this.destination.nativeElement.value = service[1];
      this.form.patchValue({
        dest: service[1]
      });
      google.maps.event.trigger(this.autocomplete, "place_changed");
      google.maps.event.trigger(this.autocompletedest, "place_changed");
      this.getRoutes();
    } else if (service[0]) {
    } else if (service[1]) {
      this.destinationLocation = service[1];
      this.source.nativeElement.value = service[1];
      // this.form.controls['src'].setValue(this.sourceLocation);
      this.getRoutes();
    } else {
      // this.source.nativeElement.value = '';
      // this.destination.nativeElement.value = '';
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            this.map.setCenter(pos);
            var marker1 = new google.maps.Marker({
              position: pos,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 70,
                fillColor: "#FAFAFA",
                fillOpacity: 0.4,
                strokeWeight: 0.4
              }
            });

            if (!this.param1) {
              let geocoder = new google.maps.Geocoder();

              geocoder.geocode({ location: pos }, results => {
                if (results[0]) {
                  let value = results[0].formatted_address.split(",");
                  let count = value.length;
                  this.countryName = value[count - 1];

                  let city = value[count - 3];
                  this.sourceLocation = city.replace(" ", "");
                  this.source.nativeElement.value = this.sourceLocation;
                  this.form.controls["src"].setValue(this.sourceLocation);
                  google.maps.event.trigger(this.autocomplete, "place_changed");
                }
              });
            }
          },
          () => {
            $.post(
              "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA1AxTRgZ9TrX-cWCE76YHKVDT6Pr8R5O0",
              success => {
                const pos = {
                  lat: success.location.lat,
                  lng: success.location.lng
                };

                this.map.setCenter(pos);
                let marker1 = new google.maps.Marker({
                  position: pos,
                  icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 70,
                    fillColor: "#FAFAFA",
                    fillOpacity: 0.4,
                    strokeWeight: 0.4
                  }
                });

                if (!this.param1) {
                  let geocoder = new google.maps.Geocoder();

                  geocoder.geocode({ location: pos }, results => {
                    if (results[0]) {
                      let value = results[0].formatted_address.split(",");

                      let count = value.length;
                      //let country=value[count-1];
                      //let state=value[count-2];
                      let city = value[count - 3];
                      this.sourceLocation = city.replace(" ", "");
                      this.source.nativeElement.value = this.sourceLocation;
                      this.form.controls["src"].setValue(this.sourceLocation);
                      google.maps.event.trigger(
                        this.autocomplete,
                        "place_changed"
                      );
                    }
                  });
                }
              }
            ).fail(function(err) {
              console.log("API Geolocation error! \n\n", err);
            });
          }
        );
      } else {
        console.log("browser doesn't support geolocation");
      }
      //////////////
    }
  }

  ngOnInit() {
    this.hidebar = false;
    this.playroute = true;
    this.remainingSeconds = 0;
    this.showValue = true;
    this.sidenavval = true;
    this.refresh = true;
    this.link = AppSettings.UI_API_ENDPOINT;
    this.errormsg = false;
    this.coEmissionTabClicked = false;
    this.passengerInfoClick = false;
    this.travelInfoClick = false;
    if ($(window).width() < 479) {
      this.mobile = true;
    }
    this.form = this.fb.group({
      src: ["", [Validators.required]],
      dest: ["", [Validators.required]]
    });
    //set google maps defaults
    this.mapProp = {
      center: new google.maps.LatLng(-25.344, 131.036),
      zoom: 5,
      minZoom: 4,
      maxZoom: 8,
      panControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      rotateControl: true,
      disableDefaultUI: true,
      styles: MapCss.MAPCSS,
      mapId: 'AIzaSyCh-H9fxZXaR43dQQgg4FIwLWpAX2L5C7E'
    };

    this.map = new google.maps.Map(document.getElementById("googleMap"),this.mapProp);
    // var map = this.map;
    this.getSrcandDest();
    this.getServiceData();
  }

  //end ngoninit()

  private getSrcandDest() {
    var input = this.source.nativeElement;
    var destination = this.destination.nativeElement;
    var autocomplete = new google.maps.places.Autocomplete(input, {
      placeIdOnly: true,
      types: ["(cities)"]
    });
    // var bounds = new google.maps.LatLngBounds();
    // autocomplete.bindTo("bounds", this.map);

    this.autocomplete = autocomplete;

    var autocompletedest = new google.maps.places.Autocomplete(destination, {
      placeIdOnly: true,
      types: ["(cities)"]
    });

    autocompletedest.bindTo("bounds", this.map);

    this.autocompletedest = autocompletedest;

    var map = this.map;
    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById("infowindow-content");

    var geocoder = new google.maps.Geocoder();

    var srcloc, srcLatlang;

    var marker1 = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: { lat: 888999909000000, lng: 9999000099000 },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 48,
        fillColor: "#F0F0F0",
        fillOpacity: 0.2,
        strokeWeight: 0.2
      }
    });

    var marker3 = new google.maps.Marker({
      map: map,
      position: { lat: 888999909000000, lng: 9999000099000 },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#44CBCE",
        fillOpacity: 10,
        strokeColor: "#44CBCE"
      }
    });
    var marker5 = new google.maps.Marker({
      map: map,
      position: { lat: 888999909000000, lng: 9999000099000 },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5,
        fillColor: "#FFFFFF",
        fillOpacity: 15,
        strokeColor: "#FFFFFF"
      }
    });

    autocomplete.addListener("place_changed", () => {
      let tempSrc = this.source.nativeElement.value;
      tempSrc = tempSrc.split(",");
      // console.log(tempSrc[2]);
      // this.countryName = tempSrc[2];
      tempSrc = tempSrc[0];

      this.source.nativeElement.value = tempSrc;

      if (this.flightPath) {
        this.flightPath.setMap(null);
        this.flightPathShadow.setMap(null);
        this.animationMarker.setVisible(false);
        clearInterval(this.autoDriveTimer);
      }

      var place;

      if (autocomplete.getPlace() && !this.srcSwapCalled) {
        place = autocomplete.getPlace();
        if (!place.place_id) {
          return;
        }

        geocoder.geocode({ placeId: place.place_id }, (results, status) => {
          map.setZoom(map.maxZoom - 1);
          map.setCenter(results[0].geometry.location);

          marker1.setPlace({
            placeId: place.place_id,
            location: results[0].geometry.location
          });
          marker3.setPlace({
            placeId: place.place_id,
            location: results[0].geometry.location
          });
          marker5.setPlace({
            placeId: place.place_id,
            location: results[0].geometry.location
          });

          marker1.setVisible(true);
          marker3.setVisible(true);
          marker5.setVisible(true);

          infowindowContent.children["place-name"].textContent = place.name;
          infowindowContent.children["place-id"].textContent = place.place_id;
          infowindowContent.children["place-address"].textContent =
            results[0].formatted_address;
          srcloc = results[0].formatted_address;
          srcLatlang = new google.maps.LatLng(
            results[0].geometry.location.lat(),
            results[0].geometry.location.lng()
          );
          this.sourceLocation = srcloc;
          this.sourcelatlang = srcLatlang;
        });
      } else {
        this.srcSwapCalled = false;
        geocoder.geocode({ address: this.sourceLocation }, results => {
          place = {
            place_id: results[0].place_id,
            name: results[0].formatted_address
          };

          if (!place.place_id) {
            return;
          }

          geocoder.geocode({ placeId: place.place_id }, (results, status) => {
            map.setZoom(map.maxZoom - 1);
            map.setCenter(results[0].geometry.location);

            marker1.setPlace({
              placeId: place.place_id,
              location: results[0].geometry.location
            });
            marker3.setPlace({
              placeId: place.place_id,
              location: results[0].geometry.location
            });
            marker5.setPlace({
              placeId: place.place_id,
              location: results[0].geometry.location
            });

            marker1.setVisible(true);
            marker3.setVisible(true);
            marker5.setVisible(true);

            infowindowContent.children["place-name"].textContent = place.name;
            infowindowContent.children["place-id"].textContent = place.place_id;
            infowindowContent.children["place-address"].textContent =
              results[0].formatted_address;
            srcloc = results[0].formatted_address;

            srcLatlang = new google.maps.LatLng(
              results[0].geometry.location.lat(),
              results[0].geometry.location.lng()
            );
            this.sourceLocation = srcloc;
            this.sourcelatlang = srcLatlang;
            // console.log("this.sourcelatlang", this.sourcelatlang);
          });
        });
      }
    });

    var destloc, destLatlang;

    var marker2 = new google.maps.Marker({
      position: { lat: 888999909000000, lng: 9999000099000 },
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 48,
        fillColor: "#F0F0F0",
        fillOpacity: 0.2,
        strokeWeight: 0.2
      }

    });

    var marker4 = new google.maps.Marker({
      position: { lat: 888999909000000, lng: 9999000099000 },
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,

        fillOpacity: 0.0,
        strokeColor: "#44CBCE",
        strokeWeight: 4
      }
    });

    // var marker6 = new google.maps.Marker({
    //   map: map,
    //   position: { lat: 888999909000000, lng: 9999000099000 },
    //   icon: {
    //     path: google.maps.SymbolPath.CIRCLE,
    //     scale: 0,

    //     fillOpacity: 0.0,

    //   }
    // });

    autocompletedest.addListener("place_changed", () => {
      let tempSrc = this.destination.nativeElement.value;
      tempSrc = tempSrc.split(",");

      tempSrc = tempSrc[0];
      this.destination.nativeElement.value = tempSrc;

      if (this.flightPath) {
        this.flightPath.setMap(null);
        this.flightPathShadow.setMap(null);
        this.animationMarker.setVisible(false);
        clearInterval(this.autoDriveTimer);
      }

      //var destplace = autocompletedest.getPlace();

      var destplace;

      if (autocompletedest.getPlace() && !this.destSwapCalled) {
        destplace = autocompletedest.getPlace();

        if (!destplace.place_id) {
          return;
        }
        geocoder.geocode({ placeId: destplace.place_id }, (results, status) => {
          // console.log("sddddd", results);
          map.setZoom(map.minZoom + 1);
          map.setCenter(results[0].geometry.location);

          // Set the position of the marker using the place ID and location.
          marker2.setPlace({
            placeId: destplace.place_id,
            location: results[0].geometry.location
          });

          marker4.setPlace({
            placeId: destplace.place_id,
            location: results[0].geometry.location
          });

          // marker6.setPlace({
          //   placeId: destplace.place_id,
          //   location: results[0].geometry.location
          // });

          marker2.setVisible(true);
          marker4.setVisible(true);
          // marker6.setVisible(true);

          infowindowContent.children["place-name"].textContent = destplace.name;
          infowindowContent.children["place-id"].textContent =
            destplace.place_id;
          infowindowContent.children["place-address"].textContent =
            results[0].formatted_address;
          destloc = destplace.name;
          destLatlang = new google.maps.LatLng(
            results[0].geometry.location.lat(),
            results[0].geometry.location.lng()
          );
          this.destinationLocation = destloc;
          this.destinationLatlang = destLatlang;
        });
      } else {
        this.destSwapCalled = false;
        geocoder.geocode({ address: this.destinationLocation }, results => {
          //console.log('Destination : ', results[0])
          destplace = {
            place_id: results[0].place_id,
            name: results[0].formatted_address
          };

          if (!destplace.place_id) {
            return;
          }
          geocoder.geocode(
            { placeId: destplace.place_id },
            (results, status) => {
              map.setZoom(map.minZoom + 1);
              map.setCenter(results[0].geometry.location);

              // Set the position of the marker using the place ID and location.
              marker2.setPlace({
                placeId: destplace.place_id,
                location: results[0].geometry.location
              });

              marker4.setPlace({
                placeId: destplace.place_id,
                location: results[0].geometry.location
              });

              // marker6.setPlace({
              //   placeId: destplace.place_id,
              //   location: results[0].geometry.location
              // });

              marker2.setVisible(true);
              marker4.setVisible(true);
              // marker6.setVisible(true);

              infowindowContent.children["place-name"].textContent =
                destplace.name;
              infowindowContent.children["place-id"].textContent =
                destplace.place_id;
              infowindowContent.children["place-address"].textContent =
                results[0].formatted_address;
              destloc = destplace.name;
              destLatlang = new google.maps.LatLng(
                results[0].geometry.location.lat(),
                results[0].geometry.location.lng()
              );
              this.destinationLocation = destloc;
              this.destinationLatlang = destLatlang;
            }
          );
          // map.fitBounds(bounds);
        });
      }
    });
  }
  onClick(event:Event){

  }

  private calculateDistance() {
    const src = this.sourcelatlang;
    const des = this.destinationLatlang;
    const distance = Number(
      (
        google.maps.geometry.spherical.computeDistanceBetween(src, des) / 1000
      ).toFixed(0)
    );
    this.hdistance = distance;
    this.hdistanceInMiles = Math.round(this.hdistance * 0.62137);
    return distance;
  }
  private calculateTime() {
    this.distance = this.calculateDistance();
    if (this.distance < 100) {
      this.hyperloopTime = Number(
        ((this.distance / this.hyperloopMinSpeed) * 60).toFixed(0)
      );
      this.hyperloopSpeed = this.hyperloopMinSpeed;
      this.hyperloopMiledSpeed = Math.round(this.hyperloopSpeed * 0.62137);
    } else if (this.distance >= 100 && this.distance <= 250) {
      this.hyperloopTime = Number(
        ((this.distance / this.hyperloopAvgTime) * 60).toFixed(0)
      );
      this.hyperloopSpeed = this.hyperloopAvgTime;
      this.hyperloopMiledSpeed = Math.round(this.hyperloopAvgTime * 0.62137);
    } else {
      this.hyperloopTime = Number(
        ((this.distance / this.hyperloopMaxSpeed) * 60).toFixed(0)
      );
      this.hyperloopSpeed = this.hyperloopMaxSpeed;
      this.hyperloopMiledSpeed = Math.round(this.hyperloopMaxSpeed * 0.62137);
    }
    this.miledistance = Math.round(this.distance * 0.62137);
    if (this.distance > 200) {
      this.airplanTime = Math.ceil(this.distance / this.airplanAvgSpeed);
      this.airplanSpeed = this.airplanAvgSpeed;
      this.airplaneMileSpeed = Math.round(this.airplanSpeed * 0.62137);
    } else {
      this.airplanSpeed = "--";
      this.airplaneMileSpeed = "--";
      this.airplanTime = "--";
    }

    //Counter for hyperloop distance in Km
    let temp1 = this.distance;
    this.distance = 0;
    let hyperloopDistanceInKm = setInterval(() => {
      this.distance++;
      if (this.distance === temp1) {
        this.distance = temp1;
        clearInterval(hyperloopDistanceInKm);
      }
    });

    //Counter for hyperloop distance in miles
    let temp2 = this.miledistance;
    this.miledistance = 0;
    let hyperloopDistanceInMiles = setInterval(() => {
      this.miledistance++;
      if (this.miledistance === temp2) {
        this.miledistance = temp2;
        clearInterval(hyperloopDistanceInMiles);
      }
    });
  }

  showDirectionLogo: boolean;
  showInputPanel() {
    $("#leftpanel").removeClass("hide-panel");
    this.showDirectionLogo = false;
  }

  hideInputPanel() {
    $("#leftpanel").addClass("hide-panel");
    this.showDirectionLogo = true;
  }

  //python api call hyderloop route
  getRoutes() {
    if ($(window).width() < 800) {
      this.hideInputPanel();
    }

    // if (this.mobilestate && this.speedTabClicked) {
    //   this.showSpeedoMeter = true;
    //   console.log("is it calling");

    //     this.startSpeedometer();

    // }
    // this.hyperLoopPanelState = 'out';
    // this.airplanePanelState = 'out';
    // this.trainPanelState = 'out';
    // this.carPanelState = 'out';
    // this.sharePanelState = 'out';
    this.sidenavval1 = false;
    this.hidebar = false;

    this.spinner.show();
    console.log("source", this.sourceLocation);
    console.log("dest", this.destinationLocation);
    this.http
      .post(AppSettings.PYTHON_API_ENDPOINT + "/get_route", {
        source: this.sourceLocation,
        destination: this.destinationLocation
      })
      .subscribe(
        (data: any) => {
          console.log(data, 'data')
          setTimeout(() => {
            this.spinner.hide();
          }, 500);

          var distancelimit = this.calculateDistance();
          console.log("distance", distancelimit);
          var miledistance = Math.round(distancelimit * 0.62137);

          if (distancelimit <= 2500) {
          this.exceedDistMsg=false;
          this.playroute = false;
          this.exceedlimit = true;
          this.showValue = false;
          this.refresh = false;
          this.errormsg = false;
          // if(data.length){
          // create on varibale outside and take data into that variable  so that we can apply methods
          // }
          var MapPoints = data.json();
          var flightPlanCoordinates = [];
          var bounds = new google.maps.LatLngBounds();

          MapPoints.forEach(i => {
            i.forEach(j => {
              this.marker = new google.maps.Marker({
                position: new google.maps.LatLng(j.lat, j.lng)
              });
              flightPlanCoordinates.push(this.marker.getPosition());
              bounds.extend(this.marker.position);

              google.maps.event.addListener(
                this.marker,
                "click",
                (function(marker, i) {
                  return function() {
                    this.infowindow.setContent(j.lat + " " + j.lng);
                  };
                })(this.marker, j)
              );
            });
          });

          if ($(window).width() > 800) {
            this.map.fitBounds(bounds, {
              top: 30,
              right: 150,
              left: 350,
              bottom: 50
            });
          } else {
            this.map.fitBounds(bounds, {
              top: 250,
              left: 50,
              right: 50,
              bottom: 100
            });
          }
          // console.log("this.countryName", (this.countryName));
          if (countryUnitSystem.COUNTRY.includes(this.countryName)) {
            // console.log("country is present");
            var unit = google.maps.UnitSystem.IMPERIAL;
          } else {
            var unit = google.maps.UnitSystem.METRIC;
          }

          //calculating distance and duration using distance matrix service for car
          var service = new google.maps.DistanceMatrixService();
          var ddistance;
          var dduration;
          service.getDistanceMatrix(
            {
              origins: [this.sourceLocation],
              destinations: [this.destinationLocation],
              travelMode: google.maps.TravelMode.DRIVING,
              unitSystem: unit
            },
            (response, status) => {
              // console.log("car response", response);
              var origins = response.originAddresses;
              var destinations = response.destinationAddresses;

              for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;

                for (var j = 0; j < results.length; j++) {
                  var element = results[j];
                  if (element.distance) {
                    ddistance = element.distance.text;
                    dduration = element.duration.text;
                  } else {
                    ddistance = "--";
                    dduration = "--";
                  }
                  var from = origins[i];
                  var to = destinations[j];
                }
              }

              let temp1 = ddistance.split(" ");
              this.emperialcarUnit = temp1[1];
              this.drivingDistance = temp1[0].replace(",", "");
              this.dtime = String(dduration).split(" ");

              this.drivingTime = String(dduration).split(" ");
              this.drivingmile = Math.round(
                Number(this.drivingDistance) / 0.62137
              );

              if (Number.isNaN(this.drivingmile)) {
                this.drivingmile = "--";
              }
            }
          );
          //get distance and duration for transit traveling mode
          var tdistance;
          var tduration;
          service.getDistanceMatrix(
            {
              origins: [this.sourceLocation],
              destinations: [this.destinationLocation],
              travelMode: google.maps.TravelMode.TRANSIT,
              unitSystem: unit
            },
            (response, status) => {
              var origins = response.originAddresses;
              var destinations = response.destinationAddresses;
              // console.log("train response", response);
              for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                  var element = results[j];
                  if (element.distance) {
                    tdistance = element.distance.text;
                    tduration = element.duration.text;
                  } else {
                    tdistance = "--";
                    tduration = "--";
                  }
                  var from = origins[i];
                  var to = destinations[j];
                }
              }

              let temp1 = tdistance.split(" ");
              this.emperialtrainUnit = temp1[1];
              this.transitDistance = temp1[0].replace(",", "");
              this.publicttime = String(tduration).split(" ");
              this.PTTime = String(tduration).split(" ");
              this.transitmile = Math.round(
                Number(this.transitDistance) / 0.62137
              );

              if (Number.isNaN(this.transitmile)) {
                this.transitmile = "--";
              }
            }
          );

          if (this.flightPath) {
            this.flightPath.setMap(null);
            this.flightPathShadow.setMap(null);
          }

          this.flightPathShadow = new google.maps.Polyline({
            map: this.map,
            path: flightPlanCoordinates,
            strokeColor: "#44DCEA",
            strokeOpacity: 0.1,
            strokeWeight: 10
          });

          this.flightPath = new google.maps.Polyline({
            map: this.map,
            path: flightPlanCoordinates,
            strokeColor: "#44DCEA",
            strokeOpacity: 1.0,
            strokeWeight: 4,
            geodesic: true
          });
          var image = "../../assets/images/capsulePointer.png";

          this.animationMarker = new google.maps.Marker({
            position: {
              lat: 0.0,
              lng: 0.0
            },

            map: this.map,
            // icon: "../assets/images/group.svg"
            icon: {
              // path: flightPlanCoordinates,
              url:'../assets/images/group.svg',
              // scale: 8,
              // fillColor: "#44CBCE",
              // fillOpacity: 5,
              // strokeColor: "#44CBCE",
              // rotation: google.maps.geometry.spherical.computeHeading(this.sourceLocation, this.destinationLocation)
            }
          });

          this.animationMarker.info = new google.maps.InfoWindow({
            content: "<h6>HyperloopTT</h6>"
            // + '<b>Source</b>:' + this.sourceLocation + '<br><b>destination</b>' +
            //   this.destinationLocation
          });

          this.startRouteAnimation(this.animationMarker, flightPlanCoordinates);
          //this.calculateDistance();
          this.calculateTime();

          // setTimeout(() => {
          //   this.hyperLoopPanelState = 'in';
          //   this.hidebar = false;
          //   this.calculateTime();
          // }, 2000);

          // setTimeout(() => {
          //   this.airplanePanelState = 'in';
          //   this.hidebar = false;
          // }, 4000);

          // this.trainPanelState = 'in';
          // this.hidebar = false;
          let transitCountInt = setInterval(() => {
            if (this.transitDistance) {
              clearInterval(transitCountInt);
              //Counter for train distance in Km
              if (String(this.transitDistance) !== "--") {
                let tempTransitDistanceInKm = this.transitDistance;
                var temp = String(this.transitDistance).split(".");
                this.transitDistance = 0;
                let trainDistanceInKm = setInterval(() => {
                  this.transitDistance++;
                  if (this.transitDistance === Number(temp[0])) {
                    this.transitDistance = tempTransitDistanceInKm;
                    clearInterval(trainDistanceInKm);
                  }
                });
              }

              if (
                !Number.isNaN(this.transitmile) &&
                String(this.transitmile) !== "--"
              ) {
                //Counter for train distance in miles
                let tempTransitDistanceInMiles = this.transitmile;
                this.transitmile = 0;
                let trainTransitDistanceInMiles = setInterval(() => {
                  this.transitmile++;
                  if (this.transitmile === tempTransitDistanceInMiles) {
                    this.transitmile = tempTransitDistanceInMiles;
                    clearInterval(trainTransitDistanceInMiles);
                  }
                });
              }
            }
          });

          let driveCountInt = setInterval(() => {
            if (this.drivingDistance) {
              clearInterval(driveCountInt);
              //Counter for Car distance in km
              if (String(this.drivingDistance) !== "--") {
                let tempDrivingDistance = this.drivingDistance;
                // console.log((this.drivingDistance));
                var temp = String(this.drivingDistance).split(".");
                this.drivingDistance = 0;
                let drivingDistanceInKm = setInterval(() => {
                  this.drivingDistance++;
                  if (this.drivingDistance === Number(temp[0])) {
                    this.drivingDistance = tempDrivingDistance;
                    clearInterval(drivingDistanceInKm);
                  }
                });
              }

              if (
                !Number.isNaN(this.drivingmile) &&
                String(this.drivingmile) !== "--"
              ) {
                //Counter for car distance in miles
                let tempDrivingDistanceInMiles = this.drivingmile;
                this.drivingmile = 0;
                let drivingDistanceInMiles = setInterval(() => {
                  this.drivingmile++;
                  if (this.drivingmile === tempDrivingDistanceInMiles) {
                    this.drivingmile = tempDrivingDistanceInMiles;
                    clearInterval(drivingDistanceInMiles);
                  }
                });
              }
            }
          });

          this.sidenavval1 = true;

        }
        else{
          this.exceedDistMsg=true;
        }
      },
        error => {
          console.log("server error", error);
          if ($(window).width() < 800) {
            this.hideInputPanel();
          }
          setTimeout(() => {
            this.spinner.hide();
          }, 500);
        }

      );

    this.errormsg = false;
  }

  autoDriveTimer: any;
  startRouteAnimation = function(marker, autoDriveS) {
    this.autoDriveTimer = setInterval(function() {
      // stop the timer if the route is finished
      if (autoDriveS.length === 0) {
        clearInterval(this.autoDriveTimer);
        marker.setVisible(false);
      } else {
        // move marker to the next position (always the first in the array)
        marker.setPosition(autoDriveS[0]);
        // remove the processed position
        autoDriveS.shift();
      }
    }, 40);
  };


  getPrivousIndex() {
    if(this.index == 4){
      this.index--;
      this.passengerTabClicked = true;
      this.coEmissionTabClicked = false;
      this.speedTabClicked = false;
      this.timesTabclicked = false;
      this.exampleTabClicked = false;
    }
    else if(this.index == 3){
      this.index--;
      this.passengerTabClicked = false;
      this.coEmissionTabClicked = false;
      this.speedTabClicked = true;
      setTimeout(() => {
        this.startSpeedometer();
      }, 200);
      this.timesTabclicked = false;
      this.exampleTabClicked = false;
    }
    else if(this.index==2){
      this.index--;
      this.passengerTabClicked = false;
      this.coEmissionTabClicked = false;
      this.speedTabClicked = false;
      this.timesTabclicked = true;
      this.exampleTabClicked = false;
    }
    else {
      this.index--
      this.passengerTabClicked = false;
      this.coEmissionTabClicked = false;
      this.speedTabClicked = false;
      this.timesTabclicked = false;
      this.exampleTabClicked = true;
    }
  }

  getNextIndex() {
    console.log(this.index);
    if (this.index == 0) {
      this.index++;
      this.timesTabclicked = true;
      this.exampleTabClicked = false;
    } else if (this.index == 1) {
      this.index++;
      this.timesTabclicked = false;
      this.speedTabClicked = true;
      setTimeout(() => {
        this.startSpeedometer();
      }, 200);
    } else if (this.index == 2) {
      this.index++;
      this.speedTabClicked = false;
      this.passengerTabClicked = true;
    } else if (this.index == 3) {
      this.index++;
      this.passengerTabClicked = false;
      this.coEmissionTabClicked = true;
    } else {
      this.index = 0;
      this.passengerTabClicked = false;
      this.coEmissionTabClicked = false;
      this.speedTabClicked = false;
      this.timesTabclicked = false;
      this.exampleTabClicked = true;
    }

  }

  sidenavval1: any = false;
  sidenav() {
    if (!this.sidenavval) {
      this.sidenavval = !this.sidenavval;
    } else {
      setTimeout(() => {
        this.sidenavval = !this.sidenavval;
      }, 400);
    }

    this.sidenavval1 = false;
    setTimeout(() => {
      this.sidenavval1 = true;
    }, 400);

    this.menuState = this.menuState === "in" ? "out" : "in";
    this.carbonInfoClick = false;
    this.errormsg = false;
  }

  mobilesidenavval: boolean = true;
  mobileMenuState: string = "in";
  mobileSidenav() {
    this.mobilesidenavval = !this.mobilesidenavval;
    this.mobileMenuState = this.mobileMenuState === "in" ? "out" : "in";
  }

  reload() {
    window.location.reload();
  }

  // http://40.112.165.32:2200/#/httmap
  // https://twitter.com/share?http://40.112.165.32:2200/?src=New_York,_NY,_USA:Chicago,_IL,_USA
  // https://twitter.com/share?http://40.112.165.32:2200/?src=S%C3%A3o_Paulo,_State_of_S%C3%A3o_Paulo,_Brazil:Rio_de_Janeiro,_State_of_Rio_de_Janeiro,_Brazil

  // https://twitter.com/share?http://40.112.165.32:2200/?src=London,_UK:Amsterdam,_Netherlands
  drawRouteLinkOne() {
    // let source = this.sourceLocation.replace(/ /g, "_");
    // let destination = this.destinationLocation.replace(/ /g, "_");
    window.open(
      AppSettings.UI_API_ENDPOINT + "/#/httmap?src= Los_Angeles :San_Francisco",
      "_self"
    );
  }
  drawRouteLinkTwo() {
    window.open(
      AppSettings.UI_API_ENDPOINT +
        "/#/httmap?src=Shanghai:Beijing",
      "_self"
    );
  }
  drawRouteLinkThree() {
    window.open(
      AppSettings.UI_API_ENDPOINT +
        "/#/httmap?src=S%C3%A3o_Paulo,_State_of_S%C3%A3o_Paulo,_Brazil:Rio_de_Janeiro,_State_of_Rio_de_Janeiro,_Brazil",
      "_self"
    );
  }
  drawRouteLinkFour() {
    window.open(
      AppSettings.UI_API_ENDPOINT +
        "/#/httmap?src=London,_UK:Paris,_France",
      "_self"
    );
  }
  setVisible() {
    this.visible = this.visible === "leave" ? "enter" : "leave";
  }
  slidertoggle() {
    this.toggle = this.toggle === "down" ? "up" : "down";
    setTimeout(() => {
      this.shareflag = this.shareflag == false ? true : false;
    }, 200);
  }

  exampleTabClicked = true;
  timesTabclicked = false;
  passengerTabClicked = false;
  speedTabClicked = false;
  carbonInfoClick = false;
  // travelInfoClick =  false;

  carbonInfo() {
    this.carbonInfoClick = true;
  }

  passengerInfo() {
    this.passengerInfoClick = true;
  }
  travelInfo() {
    this.travelInfoClick = true;
  }

  exampleTab() {
    $(".bottomwindow").css("display", "block");
    this.exampleTabClicked = true;
    this.timesTabclicked = false;
    this.passengerTabClicked = false;
    this.speedTabClicked = false;
    this.coEmissionTabClicked = false;
    // this.startSpeedometer();
    this.carbonInfoClick = false;
    this.passengerInfoClick = false;
    this.travelInfoClick = false;
    this.index = 0;
  }

  travelTab() {
    $(".bottomwindow").css("display", "none");
    this.num = Math.floor(this.hyperloopTime/10);
    // console.log(this.hyperloopTime,'sffds');

    this.exampleTabClicked = false;
    this.timesTabclicked = true;
    this.passengerTabClicked = false;
    this.speedTabClicked = false;
    this.coEmissionTabClicked = false;
    // this.startSpeedometer();
    this.carbonInfoClick = false;
    this.passengerInfoClick = false;
    this.travelInfoClick = false;
    this.index = 1;

  }
  timesTab() {
    $(".bottomwindow").css("display", "none");
    this.exampleTabClicked = false;
    this.timesTabclicked = true;
    this.passengerTabClicked = false;
    this.speedTabClicked = false;
    this.coEmissionTabClicked = false;
    this.carbonInfoClick = false;
    this.passengerInfoClick = false;
  }
  speedTab() {
    $(".bottomwindow").css("display", "none");
    this.exampleTabClicked = false;
    this.timesTabclicked = false;
    this.passengerTabClicked = false;
    this.speedTabClicked = true;
    this.coEmissionTabClicked = false;
    this.carbonInfoClick = false;
    this.passengerInfoClick = false;
    this.travelInfoClick = false;
    setTimeout(() => {
      this.startSpeedometer();
    }, 20);

    this.index = 2;

  }
  passengerTab() {
    $(".bottomwindow").css("display", "none");
    this.exampleTabClicked = false;
    this.timesTabclicked = false;
    this.passengerTabClicked = true;
    this.speedTabClicked = false;
    this.coEmissionTabClicked = false;
    this.carbonInfoClick = false;
    this.travelInfoClick = false;

    // this.passengerInfoClick = true;
    // this.startSpeedometer();
    this.index = 3;

  }
  coEmissionTab() {
    this.exampleTabClicked = false;
    this.timesTabclicked = false;
    this.passengerTabClicked = false;
    this.speedTabClicked = false;
    this.coEmissionTabClicked = true;
    this.passengerInfoClick = false;
    this.travelInfoClick = false;
    // this.startSpeedometer();
    this.index = 4;

  }

  srcSwapCalled: boolean = false;
  destSwapCalled: boolean = false;
  swapSourceDest() {
    if (this.sourceLocation && this.destinationLocation && !this.playroute) {
      this.srcSwapCalled = true;
      this.destSwapCalled = true;
      let temp1 = this.sourceLocation;
      this.sourceLocation = this.destinationLocation;
      this.destinationLocation = temp1;
      this.source.nativeElement.value = this.sourceLocation;
      this.destination.nativeElement.value = this.destinationLocation;
      google.maps.event.trigger(this.autocomplete, "place_changed");
      google.maps.event.trigger(this.autocompletedest, "place_changed");
      this.getRoutes();
    }
  }

  hidepopup = true;
  hidePopup() {
    this.hidepopup = true;
  }

  hideerrorpopup() {
    this.errormsg = false;
  }

  moveLeft() {
    console.log("move left");
  }
  moveRight() {
    console.log("move right");
  }


}
