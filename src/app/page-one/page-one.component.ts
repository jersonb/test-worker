import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppWorkerService } from '../app.worker.service';
@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.css'],
})
export class PageOneComponent implements OnInit {
  btnName = 'Solicitação enviada';
  btnDisabled = false;
  constructor(private readonly snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (localStorage.getItem('btn-status') === '') {
      this.btnEnable();
    }
  }

  private btnDisable() {
    this.btnDisabled = true;
    this.btnName = 'Solicitação enviada';
    localStorage.setItem('btn-status', 'disabled');
  }

  private btnEnable() {
    this.btnDisabled = false;
    this.btnName = 'Enviar Solicitação';
    localStorage.setItem('btn-status', '');
  }

  private sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  private async generateReport(data: any): Promise<any> {
    this.btnDisable();
    this.sleep(3000).then(() => {
      console.log('Wait!');
      let check = new Date().getSeconds() % 5 === 0;
      if (check) {
        console.log('Sucess!');
        this.showNotification();
        this.btnEnable();
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
    const worker = new AppWorkerService();
    worker.addEventListener(() => {
      this.generateReport(new Date());
    });
  }
}
