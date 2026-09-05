import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSettings } from '../const/app_config';
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  selector: 'app-social',
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  public show: boolean = false;
  @Input('source') sourceLocation:string;
  @Input('destination') destinationLocation:string;
  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  copytxt() {
    if (this.sourceLocation && this.destinationLocation) {
      let source = this.sourceLocation.replace(/ /g, "_");
      let destination = this.destinationLocation.replace(/ /g, "_");
      var url = AppSettings.UI_API_ENDPOINT + "/?src=" + source + ":" + destination;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          this.openSnackBar("Link Copied!");
        });
      } else {
        this.openSnackBar("Link Copied!");
      }
    } else {
      this.openSnackBar("Please!! select source and destination");
    }
  }

  emailshare() {
    if (this.sourceLocation && this.destinationLocation) {
      let source = this.sourceLocation.replace(/ /g, "_");
      let destination = this.destinationLocation.replace(/ /g, "_");
      var url = AppSettings.UI_API_ENDPOINT + "/?src=" + source + ":" + destination;
      window.location.href = `mailto:?subject=Hyperloop Route&body=${encodeURIComponent(url)}`;
    } else {
      this.openSnackBar("Please!! select source and destination");
    }
  }
  openSnackBar(msg) {
    this.snackBar.open(msg, "Dismiss", {
      duration: 3000
    });
  }

  twittershare() {
    if (this.sourceLocation && this.destinationLocation) {
      let source = this.sourceLocation.replace(/ /g, "_");
      let destination = this.destinationLocation.replace(/ /g, "_");
      var url =
        AppSettings.UI_API_ENDPOINT + "/?src=" + source + ":" + destination;
      window.open(
        "https://twitter.com/hyperlooptt?lang=en" + url,
        "",
        "width=350,height=350"
      );
    } else {
      this.openSnackBar("Please!! select source and destination");
    }
  }

  facebookshare() {
    if (this.sourceLocation && this.destinationLocation) {
      let source = this.sourceLocation.replace(/ /g, "_");
      let destination = this.destinationLocation.replace(/ /g, "_");
      var url =
        AppSettings.UI_API_ENDPOINT + "/?src=" + source + ":" + destination;
      window.open(
        "https://www.facebook.com/sharer/sharer.php?u=" + url,
        "",
        "width=350,height=350"
      );
    } else {
      this.openSnackBar("Please!! select source and destination");
    }
  }

  linkedInshare() {
    if (this.sourceLocation && this.destinationLocation) {
      let source = this.sourceLocation.replace(/ /g, "_");
      let destination = this.destinationLocation.replace(/ /g, "_");
      var url =
        AppSettings.UI_API_ENDPOINT + "/?src=" + source + ":" + destination;
      window.open(
        "https://www.linkedin.com/company/hyperlooptt/" ,
        "",
        "width=350,height=350"
      );
    } else {
      this.openSnackBar("Please!! select source and destination");
    }
  }

  Instashare() {
    if (this.sourceLocation && this.destinationLocation) {
      let source = this.sourceLocation.replace(/ /g, "_");
      let destination = this.destinationLocation.replace(/ /g, "_");
      var url =
        AppSettings.UI_API_ENDPOINT + "/?src=" + source + ":" + destination;
      window.open(
        "https://www.instagram.com/p/Bs9AASgHG03/" ,
        "",
        "width=350,height=350"
      );
    } else {
      this.openSnackBar("Please!! select source and destination");
    }
  }
  youtubeShare(){
    if (this.sourceLocation && this.destinationLocation) {
      let source = this.sourceLocation.replace(/ /g, "_");
      let destination = this.destinationLocation.replace(/ /g, "_");
      var url =
        AppSettings.UI_API_ENDPOINT + "/?src=" + source + ":" + destination;
      window.open(
        "https://www.youtube.com/channel/UCWOU6ihqkVSoLiaSUGdDNOQ",
        "",
        "width=350,height=350"
      );
    } else {
      this.openSnackBar("Please!! select source and destination");
    }
  }
  }



