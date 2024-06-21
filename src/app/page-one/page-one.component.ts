import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.css'],
})
export class PageOneComponent {
  goToPageTwo() {
    console.log('Chamou!!');
  }
}
