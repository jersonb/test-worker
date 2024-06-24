import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { SlowRequest } from './models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SlowApiService {
  urlApi = 'http://localhost:5173/api/v1/slow';
  constructor(private readonly httpClient: HttpClient) {}
  private destroyRef = inject(DestroyRef);

  post(slowRequest: SlowRequest): void {
    this.httpClient
      .post<void>(this.urlApi, slowRequest)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          console.log(result);
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  get(requestId: string): Observable<number> {
    return this.httpClient.get<number>(`${this.urlApi}/${requestId}`);
  }
}
