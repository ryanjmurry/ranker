import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  audio = new Audio('../../assets/theme.mp3');
  loading: boolean = false;
  audioIsPlaying: boolean = false;
  constructor() {}

  ngOnInit() {
    this.audio.loop = true;
    this.loading = true;
    setTimeout(() => {
      this.handleAudio();
      this.loading = false;
    }, 2000);
  }

  handleAudio() {
    this.audio.paused ? this.audio.play() : this.audio.pause();
    this.audioIsPlaying = this.audio.paused ? false : true;
  }

  ngOnDestroy() {
    this.audio.src = '';
  }
}
