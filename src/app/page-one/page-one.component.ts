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
  worker: AppWorkerService = null!!;
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly slowApiService: SlowApiService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('btn-status') === '') {
      this.btnEnable();
    }
  }

  submit() {
    this.worker = new AppWorkerService();
    const request: SlowRequest = {
      requestId: uuidv4(),
    };

    this.slowApiService.post(request);

    this.worker.addEventListener(() => {
      this.generateSlowRequest(request.requestId);
    });
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

  private async generateSlowRequest(requestId: string): Promise<any> {
    this.btnDisable();

    this.sleep(3000).then(() => {
      this.slowApiService.get(requestId).subscribe((result: number) => {
        if (result === -1) {
          console.log('Erro!');
          this.showFailNotification();
          this.worker.terminate();
          this.btnEnable();
          return;
        }
        if (result === 1) {
          console.log('Sucesso!');
          this.showSuccessNotification();
          this.btnEnable();
          this.worker.terminate();
          return;
        }
        console.log('Aguarde!!');
        return this.generateSlowRequest(requestId);
      });
    });
  }

  private showSuccessNotification() {
    this.snackBar.open('Sucesso!!!', 'Fechar', {
      duration: 6000,
      horizontalPosition: 'center', // Options: 'start', 'center', 'end'
      verticalPosition: 'bottom', // Options: 'top', 'bottom',
      panelClass: ['green-snackbar'],
    });
  }

  private showFailNotification() {
    this.snackBar.open('Falhou!!!', 'Fechar', {
      duration: 6000,
      horizontalPosition: 'center', // Options: 'start', 'center', 'end'
      verticalPosition: 'bottom', // Options: 'top', 'bottom',
      panelClass: ['red-snackbar'],
    });
  }
}
