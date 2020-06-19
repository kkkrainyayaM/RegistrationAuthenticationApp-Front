import {Observable, Subject} from 'rxjs';

export class MessageService {
  private myMessage = new Subject<boolean>();

  getMessage(): Observable<boolean> {
    return this.myMessage.asObservable();
  }

  updateMessage(message: boolean) {
    this.myMessage.next(message);
  }
}
