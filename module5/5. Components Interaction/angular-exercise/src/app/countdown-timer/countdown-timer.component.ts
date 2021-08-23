import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit {
  intervalId: number;
  message = '';
  remainingTime: number;

  @Input('myTimer') seconds = 16;

  constructor() {
  }

  ngOnInit(): void {
  }

  clearTimer() {
    clearInterval(this.intervalId);
  }

  start() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime === 0) {
        this.message = 'Time out';
        this.clearTimer();
      } else {
        this.message = `T-${this.remainingTime} seconds and counting`;
      }
    }, 1000);
    if (this.remainingTime <= 0) {
      this.remainingTime = this.seconds;
    }
  }

  stop() {
    this.clearTimer();
    this.message = `Pausing at T-${this.remainingTime} seconds`;
  }

  reset() {
    this.clearTimer();
    this.remainingTime = this.seconds;
    this.message = `Click start button to start the Countdown`;
  }
}
