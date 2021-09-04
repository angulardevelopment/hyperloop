// resetSpeedoMeter() {
//     this.canvas1 = undefined;
//     this.ctx1 = undefined;
//     this.x1 = undefined;
//     this.y1 = undefined;
//     this.radius1 = 88;
//     this.circum1 = Math.PI * 2;
//     this.start1 = Math.PI / -2;
//     this.finish1 = 65;
//     this.curr1 = 0;
//     this.width1 = undefined;
//     this.height1 = undefined;

//     this.canvas2 = undefined;
//     this.ctx2 = undefined;
//     this.x2 = undefined;
//     this.y2 = undefined;
//     this.radius2 = 66;
//     this.circum2 = Math.PI * 2;
//     this.start2 = Math.PI / -2;
//     this.finish2 = 40;
//     this.curr2 = 0;
//     this.width2 = undefined;
//     this.height2 = undefined;

//     this.canvas3 = undefined;
//     this.ctx3 = undefined;
//     this.x3 = undefined;
//     this.y3 = undefined;
//     this.radius3 = 44;
//     this.circum3 = Math.PI * 2;
//     this.start3 = Math.PI / -2;
//     this.finish3 = 30;
//     this.curr3 = 0;
//     this.width3 = undefined;
//     this.height3 = undefined;

//     this.canvas4 = undefined;
//     this.ctx4 = undefined;
//     this.x4 = undefined;
//     this.y4 = undefined;
//     this.radius4 = 22;
//     this.circum4 = Math.PI * 2;
//     this.start4 = Math.PI / -2;
//     this.finish4 = 16;
//     this.curr4 = 0;
//     this.width4 = undefined;
//     this.height4 = undefined;
//   }

//   // Speedometer Guage
//   startSpeedometer() {
//     this.resetSpeedoMeter();
//     this.set_animation1();
//     this.animate1(undefined);
//     this.set_animation2();
//     this.animate2(undefined);
//     this.set_animation3();
//     this.animate3(undefined);
//     this.set_animation4();
//     this.animate4(undefined);
//   }


//   roundRect(ctx, x, y, width, height, radius) {

//     if (typeof radius === 'number') {
//       radius = { tl: radius, tr: radius, br: radius, bl: radius };
//     } else {
//       var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
//       for (var side in defaultRadius) {
//         radius[side] = radius[side] || defaultRadius[side];
//       }
//     }
//     ctx.beginPath();
//     ctx.moveTo(x + radius.tl, y);
//     ctx.lineTo(x + width - radius.tr, y);
//     ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
//     ctx.lineTo(x + width, y + height - radius.br);
//     ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
//     ctx.lineTo(x + radius.bl, y + height);
//     ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
//     ctx.lineTo(x, y + radius.tl);
//     ctx.quadraticCurveTo(x, y, x + radius.tl, y);
//     ctx.closePath();
//     ctx.stroke();
//   }

//   canvas1: any;
//   ctx1: any;
//   x1: any;
//   y1: any;
//   radius1 = 88;
//   circum1 = Math.PI * 2;
//   start1 = Math.PI / -2;
//   finish1 = 65;
//   curr1 = 0;
//   width1: any;
//   height1: any;

//   set_animation1() {
//     this.canvas1 = <HTMLCanvasElement>document.getElementById("bar1");
//     this.width1 = this.canvas1.width;
//     this.height1 = this.canvas1.height;
//     this.x1 = this.height1 / 2;
//     this.y1 = this.width1 / 2;
//     this.ctx1 = this.canvas1.getContext("2d");
//     this.ctx1.lineWidth = 2;
//     this.ctx1.strokeStyle = '#5CE0F4';
//     this.ctx1.shadowOffsetX = 4;
//     this.ctx1.shadowOffsetY = 4;
//     this.ctx1.shadowBlur = 10;
//     this.ctx1.shadowColor = '#5CE0F4';
//   }
//   //Animate guage

//   animate1(draw_to) {
//     this.ctx1.clearRect(0, 0, this.width1, this.height1);
//     this.ctx1.shadowBlur = 100;
//     this.ctx1.lineWidth = 1;
//     // this.roundRect(this.ctx1, 81, 80, 65, 15, 5);
//     this.ctx1.fillText("1,200 km/h", 100, 85);
//     this.ctx1.fillStyle = 'white';
//     this.ctx1.stroke();
//     this.ctx1.shadowBlur = 10;
//     this.ctx1.lineWidth = 2;
//     this.ctx1.beginPath();
//     this.ctx1.lineTo(75, 87);
//     this.ctx1.stroke();

//     // arc(x, y, radius, startAngle, endAngle, anticlockwise)
//     this.ctx1.arc(this.x1, this.y1, this.radius1, this.start1, draw_to, false);
//     this.ctx1.stroke();
//     this.curr1++;
//     if (this.curr1 < this.finish1 + 1) {
//       // Recursive repeat this function until the end is reached
//       requestAnimationFrame(() => {
//         setTimeout(() => {
//           this.animate1(this.circum1 * this.curr1 / 100 + this.start1);
//         }, 120);

//       });
//     }
//   }

//   canvas2: any;
//   ctx2: any;
//   x2: any;
//   y2: any;
//   radius2 = 66;
//   circum2 = Math.PI * 2;
//   start2 = Math.PI / -2;
//   finish2 = 55;
//   curr2 = 0;
//   width2: any;
//   height2: any;
//   set_animation2() {
//     this.canvas2 = <HTMLCanvasElement>document.getElementById("bar2");
//     this.width2 = this.canvas2.width;
//     this.height2 = this.canvas2.height;
//     this.x2 = this.height2 / 2;
//     this.y2 = this.width2 / 2;
//     this.ctx2 = this.canvas2.getContext("2d");
//     this.ctx2.lineWidth = 2;
//     this.ctx2.strokeStyle = '#5CE0F4';
//     this.ctx2.shadowOffsetX = 4;
//     this.ctx2.shadowOffsetY = 4;
//     this.ctx2.shadowBlur = 10;
//     this.ctx2.lineWidth = 2;
//     this.ctx2.shadowColor = '#5CE0F4';
//   }

//   animate2(draw_to) {
//     this.ctx2.clearRect(0, 0, this.width2, this.height2);
//     this.ctx2.shadowBlur = 100;
//     this.ctx2.lineWidth = 1;
//     // this.roundRect(this.ctx2, 81, 102, 65, 15, 5);
//     this.ctx2.fillText("450 km/h", 100, 106);
//     this.ctx2.fillStyle = 'white';
//     this.ctx2.stroke();
//     this.ctx2.shadowBlur = 10;
//     this.ctx2.lineWidth = 2;
//     this.ctx2.beginPath();
//     this.ctx2.lineTo(75, 109);
//     this.ctx2.stroke();
//     // arc(x, y, radius, startAngle, endAngle, anticlockwise)
//     // Re-draw from the very beginning each time so there isn't tiny line spaces between each section (the browser paint rendering will probably be smoother too)
//     this.ctx2.arc(this.x2, this.y2, this.radius2, this.start2, draw_to, false);
//     // Draw
//     this.ctx2.stroke();
//     // Increment percent
//     this.curr2++;
//     // Animate until end
//     if (this.curr2 < this.finish2 + 1) {
//       // Recursive repeat this function until the end is reached
//       requestAnimationFrame(() => {
//         setTimeout(() => {
//           this.animate2(this.circum2 * this.curr2 / 100 + this.start2);
//         }, 240);

//       });
//     }
//   }


//   canvas3: any;
//   ctx3: any;
//   x3: any;
//   y3: any;
//   radius3 = 44;
//   circum3 = Math.PI * 2;
//   start3 = Math.PI / -2;
//   finish3 = 40;
//   curr3 = 0;
//   width3: any;
//   height3: any;
//   set_animation3() {
//     this.canvas3 = <HTMLCanvasElement>document.getElementById("bar3");
//     this.width3 = this.canvas3.width;
//     this.height3 = this.canvas3.height;
//     this.x3 = this.height3 / 2;
//     this.y3 = this.width3 / 2;
//     this.ctx3 = this.canvas3.getContext("2d");
//     this.ctx3.lineWidth = 2;
//     this.ctx3.strokeStyle = '#5CE0F4';
//     this.ctx3.shadowOffsetX = 4;
//     this.ctx3.shadowOffsetY = 4;
//     this.ctx3.shadowBlur = 20;
//     this.ctx3.shadowColor = '#5CE0F4';
//   }

//   animate3(draw_to) {
//     // Clear off the canvas
//     this.ctx3.clearRect(0, 0, this.width3, this.height3);
//     this.ctx3.shadowBlur = 100;
//     this.ctx3.lineWidth = 1;
//     // this.roundRect(this.ctx3, 81, 124, 65, 15, 5);
//     this.ctx3.fillText("250 km/h", 100, 125);
//     this.ctx3.fillStyle = 'white';
//     this.ctx3.stroke();
//     this.ctx3.shadowBlur = 10;
//     this.ctx3.lineWidth = 2;
//     this.ctx3.beginPath();
//     this.ctx3.lineTo(75, 129);
//     this.ctx3.stroke();
//     // arc(x, y, radius, startAngle, endAngle, anticlockwise)
//     // Re-draw from the very beginning each time so there isn't tiny line spaces between each section (the browser paint rendering will probably be smoother too)
//     this.ctx3.arc(this.x3, this.y3, this.radius3, this.start3, draw_to, false);
//     // Draw
//     this.ctx3.stroke();
//     // Increment percent
//     this.curr3++;
//     // Animate until end
//     if (this.curr3 < this.finish3 + 1) {
//       // Recursive repeat this function until the end is reached
//       requestAnimationFrame(() => {
//         setTimeout(() => {
//           this.animate3(this.circum3 * this.curr3 / 100 + this.start3);
//         }, 360);
//       });
//     }
//   }


//   canvas4: any;
//   ctx4: any;
//   x4: any;
//   y4: any;
//   radius4 = 22;
//   circum4 = Math.PI * 2;
//   start4 = Math.PI / -2;
//   finish4 = 22;
//   curr4 = 0;
//   width4: any;
//   height4: any;
//   set_animation4() {
//     this.canvas4 = <HTMLCanvasElement>document.getElementById("bar4");
//     this.width4 = this.canvas4.width;
//     this.height4 = this.canvas4.height;
//     this.x4 = this.height4 / 2;
//     this.y4 = this.width4 / 2;
//     this.ctx4 = this.canvas4.getContext("2d");
//     this.ctx4.lineWidth = 2;
//     this.ctx4.strokeStyle = '#5CE0F4';
//     this.ctx4.shadowOffsetX = 4;
//     this.ctx4.shadowOffsetY = 4;
//     this.ctx4.shadowBlur = 10;
//     this.ctx4.shadowColor = '#5CE0F4';
//   }

//   animate4(draw_to) {
//     this.ctx4.clearRect(0, 0, this.width4, this.height4);
//     this.ctx4.shadowBlur = 100;
//     this.ctx4.lineWidth = 1;
//     // this.roundRect(this.ctx4, 81, 145, 65, 15, 5);
//     this.ctx4.fillText("90 km/h", 100, 148);
//     this.ctx4.fillStyle = 'white';
//     this.ctx4.stroke();
//     this.ctx4.shadowBlur = 10;
//     this.ctx4.lineWidth = 2;
//     this.ctx4.beginPath();
//     this.ctx4.lineTo(75, 150);
//     this.ctx4.stroke();
//     // arc(x, y, radius, startAngle, endAngle, anticlockwise)
//     // Re-draw from the very beginning each time so there isn't tiny line spaces between each section (the browser paint rendering will probably be smoother too)
//     this.ctx4.arc(this.x4, this.y4, this.radius4, this.start4, draw_to, false);
//     // Draw
//     this.ctx4.stroke();
//     // Increment percent
//     this.curr4++;
//     // Animate until end
//     if (this.curr4 < this.finish4 + 1) {
//       // Recursive repeat this function until the end is reached
//       requestAnimationFrame(() => {
//         setTimeout(() => {
//           this.animate4(this.circum4 * this.curr4 / 150 + this.start4);
//         }, 480)
//       });
//     }
//   }