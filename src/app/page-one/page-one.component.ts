import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppWorkerService } from '../app.worker.service';
@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.css'],
})
export class PageOneComponent {
  constructor(
    private snackBar: MatSnackBar,
    private worker: AppWorkerService) {}

  sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async generateReport(data: any): Promise<any> {
    this.sleep(3000).then(() => {
      console.log('Wait!');
      let check = new Date().getSeconds() % 5 === 0;
      if (check) {
        console.log('Sucess!');
        this.showNotification();
        return;
      }
      return this.generateReport(data);
    });
  }

  private showNotification() {
    this.snackBar.open('Your message here', 'Close', {
      duration: 6000,
      horizontalPosition: 'center', // Options: 'start', 'center', 'end'
      verticalPosition: 'bottom', // Options: 'top', 'bottom'
      direction: 'rtl',
      panelClass: ['custom-snackbar', 'snackbar-success'],
    });
  }

  show() {
    this.worker.addEventListener(() => {
      this.generateReport(new Date());
    });
    this.worker.postMessage({ limit: 300000 });
  }
}
