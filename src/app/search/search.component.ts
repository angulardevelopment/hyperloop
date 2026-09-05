import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit, NgZone, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HttService } from '../htt.service'
import $ from 'jquery';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
declare var  google;

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  public from: any;
  public to: any;
  public exsrc1 = "Los Angeles";
  public exdest1 = "San Francisco";
  public exsrc2 = "Sao Paulo";
  public exdest2 = "Rio de Janeiro";
  public exsrc3 = "Shanghai";
  public exdest3 = "Beijing";
  public exsrc4 = "London";
  public exdest4 = "Paris";
  public countryName: any;
  public srcLatlang: any;
  public destLatlang: any;
  public httdistance: number;
  public play: boolean = false;
  distance: any;
  mobile :boolean = false;

  @ViewChild('source') source;
  @ViewChild('destination') destination;

  public hidesearch = true;

  constructor(private router: Router, public httservice: HttService,
     private _ngZone: NgZone,private fb: FormBuilder) {
    this.hidesearch = true;
    this.play = true;
    // this.setWindow(window.innerWidth);

  }


  ngOnInit() {
    this.hidesearch = true;
    this.form = this.fb.group({
      src: [this.from, [Validators.required]],
      des: [this.to, [Validators.required],]
    })
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {

    var srcLatlang, destLatlang;
    var src = this.source.nativeElement;
    var destination = this.destination.nativeElement;
    var autocompletesrc = new google.maps.places.Autocomplete(src, { placeIdOnly: true, types: ['(cities)'] });
    var autocompletedest = new google.maps.places.Autocomplete(destination, { placeIdOnly: true, types: ['(cities)'] });

    //geolocation code


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // console.log("current pos", pos);

        let geocoder = new google.maps.Geocoder;

        geocoder.geocode({ 'location': pos }, (results) => {

          if (results[0]) {
            let value = results[0].formatted_address.split(",");
            // console.log(results[7].formatted_address);

            let count = value.length;
            let country = value[count - 1];
            let state = value[count - 2];
            this.countryName = value[count - 1];

            let city = value[count - 3];
            // console.log("currentcity", city);
            this.from = city.replace(" ", "");
            this.source.nativeElement.value = this.from;
            this.form.controls['src'].setValue(this.from);
            console.log("asAS",this.source.nativeElement.value)

            google.maps.event.trigger(autocompletesrc, 'place_changed');

          };
        });
      }, () => {

        $.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA1AxTRgZ9TrX-cWCE76YHKVDT6Pr8R5O0", (success) => {

          const pos = {
            lat: success.location.lat,
            lng: success.location.lng
          };


          let geocoder = new google.maps.Geocoder;

          geocoder.geocode({ 'location': pos }, (results) => {

            if (results[0]) {

              let value = results[0].formatted_address.split(",");
              let count = value.length;
              let city = value[count - 3];
              // console.log("currentcity", city);
              this.from = city.replace(" ", "");
              this.source.nativeElement.value = this.from;
              this.form.controls['src'].setValue(this.from);
              google.maps.event.trigger(autocompletesrc, 'place_changed');
            }
          });

        })
          .fail(function (err) {
            console.log("API Geolocation error! \n\n", err);
            // let marker = new google.maps.Marker({ position: uluru, map: map });
            // marker.setVisible(false);
          });

      });
      // this.form = this.fb.group({
      //   src: ['', [Validators.required]],
      //   // des: ['', [Validators.required],]
      // })
    }

    //end

    autocompletesrc.addListener('place_changed', () => {

      let tempSrc = this.source.nativeElement.value;
      let geocoder = new google.maps.Geocoder;

      geocoder.geocode({ 'address': tempSrc }, (results) => {
        srcLatlang = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        // console.log("src result",result[0].geometry.location.lat());
        this.srcLatlang = srcLatlang;

      })

      // console.log(this.srcLatlang);
      this.from = tempSrc;
      tempSrc = tempSrc.split(',');
      tempSrc = tempSrc[0];
      this.source.nativeElement.value = tempSrc;
      // console.log(this.srcLatlang);

    })

    var latlang;
    autocompletedest.addListener('place_changed', () => {
      let tempDest = this.destination.nativeElement.value;
      let geocoder = new google.maps.Geocoder;

      geocoder.geocode({ 'address': tempDest }, (results) => {

        destLatlang = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        latlang = destLatlang;

        this.destLatlang = latlang;

        this._ngZone.run(() => {
          // setTimeout(() => {
            this.play = true;
            this.distance = this.calculateDistance(this.srcLatlang, latlang)

            if (this.distance >= 2500) {
              this.play = false;
            }
            else {
              this.play = true;
            }
        });

      })

      this.to = tempDest;
      tempDest = tempDest.split(',');
      tempDest = tempDest[0];
      console.log("tempdest",tempDest);
      this.destination.nativeElement.value = tempDest;
      this.to = tempDest;
    })


  }

  calculateDistance(source, destination) {
    const src = source;
    const des = destination;
    // console.log(src);
    // console.log('Dest***************', des);
    const distance = Number((google.maps.geometry.spherical.computeDistanceBetween(src, des) / 1000).toFixed(0));
    this.httdistance = distance;
    // console.log("hyperloop distance", this.httdistance);
    // this.hdistanceInMiles = Math.round(this.hdistance * 0.62137);
    return distance;

  }


  Routes() {
    this.hidesearch = true;
    console.log("routes",this.from,this.to)
    this.httservice.drawRoute(this.from, this.to)
  }

  drawRouteLinkOne() {
    this.httservice.drawRoute(this.exsrc1, this.exdest1);

  }

  drawRouteLinkTwo() {
    this.httservice.drawRoute(this.exsrc2, this.exdest2);
  }
  drawRouteLinkThree() {
    this.httservice.drawRoute(this.exsrc3, this.exdest3);
  }
  drawRouteLinkFour() {
    this.httservice.drawRoute(this.exsrc4, this.exdest4);
  }
  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //     this.setWindow(event.target.innerWidth);
  // }

  // setWindow(width) {
  //   if (width > 768) {
  //     this.router.navigateByUrl('/search');
  //   } else {
  //     this.router.navigateByUrl('/httmap');
  //   }
  // }

}
