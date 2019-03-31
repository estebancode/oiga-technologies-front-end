import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public seconds = 0;
  public minutes = 0;
  public hours = 0;
  public secondsField: any;
  public minutesField: any;
  public hoursField: any;

  constructor() { }

  ngOnInit() {

    setInterval(() => {
      this.seconds ++;

      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes ++;
    }
      if (this.minutes === 60) {
        this.minutes = 0;
        this.hours ++;
      }

      if (this.seconds <= 9) {
        this.secondsField = '0' + this.seconds;
      } else {
        this.secondsField = this.seconds;
      }

      if (this.minutes <= 9) {
        this.minutesField = '0' + this.minutes;
      } else {
        this.minutesField =  this.minutes;
      }

      if (this.hours <= 9) {
        this.hoursField = '0' + this.hours;
      } else {
        this.hoursField =  this.hours;
      }
  }, 1000);

  }

 Clock() {

  }

}
