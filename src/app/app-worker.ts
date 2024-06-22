import { Observable, Subject } from "rxjs";

export class AppWorker {
  private readonly worker: Worker;
  private onMessage = new Subject<MessageEvent>();
  private onError = new Subject<ErrorEvent>();

  constructor() {
    const WORKER_ENABLED = !!Worker;

    if (WORKER_ENABLED) {

      this.worker =new Worker(new URL('./app.worker', import.meta.url));

      this.worker.onmessage = (data) => {
        this.onMessage.next(data);
      };

      this.worker.onerror = (data) => {
        this.onError.next(data);
      };
    } else {
      throw new Error("WebWorker is not enabled");
    }
  }

  addEventListener(func:any){
    this.worker.addEventListener("message", (event) =>  func.call(this, event.data));
  }

  postMessage(data:any) {
    this.worker.postMessage(data);
  }

  onmessage(): Observable<MessageEvent> {
    return this.onMessage.asObservable();
  }

  onerror(): Observable<ErrorEvent> {
    return this.onError.asObservable();
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate();
    }
  }
}
