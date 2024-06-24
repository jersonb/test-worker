import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppWorkerService } from '../app.worker.service';
import { SlowApiService } from '../slow-api.service';
import { v4 as uuidv4 } from 'uuid';
import { SlowRequest } from '../models';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.css'],
})
export class PageOneComponent implements OnInit {
  btnName = 'Solicitação enviada';
  btnDisabled = false;
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly slowApiService: SlowApiService
  ) {}

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

  private async generateReport(requestId: string): Promise<any> {
    this.btnDisable();

    this.slowApiService.get(requestId).subscribe((report: number) => {
      if (report === 1) {
        console.log('Sucess!');
        this.showNotification();
        this.btnEnable();
        return;
      }

      if (report === -1) {
        console.log('Error!');
        this.showNotification();
        this.btnEnable();
        return;
      }
      this.sleep(3000).then(() => {
        console.log('Wait!');
        return this.generateReport(requestId);
      });
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
    const request: SlowRequest = {
      requestId: uuidv4(),
    };

    this.slowApiService.post(request);

    worker.addEventListener(() => {
      this.generateReport(request.requestId);
    });
  }
}
