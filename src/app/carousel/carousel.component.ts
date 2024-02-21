import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  constructor() {}

  // Function to move to the previous slide
  moveToPrevSlide() {
    // Implement logic to move to the previous slide
    console.log('Moving to previous slide');
  }

  // Function to move to the next slide
  moveToNextSlide() {
    // Implement logic to move to the next slide
    console.log('Moving to next slide');
  }
}
