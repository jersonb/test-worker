import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
