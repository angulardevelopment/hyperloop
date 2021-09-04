import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class HttService {
  public to;
  public from;
  constructor(private router: Router) {}

  drawRoute(from, to) {
    // console.log("service", from, to);
    this.to = to;
    this.from = from;
    if (this.from && this.to) {
      this.router.navigate(["httmap"]); 
    }
  }

  returnToFrom() {
    return [this.from, this.to];
  }
}
