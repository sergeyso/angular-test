import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class TimerService {

  // SetTimeout observable event for each message
  removeAfter(message: Message): Observable<Message> {
    return new Observable(observable => {
        let expire: any =  moment.duration(moment(message.expiration_date)
          .diff(moment())).asMilliseconds();
      
        setTimeout(() => {
            observable.next(message);
            observable.complete();
        }, expire);
    });
  }
}