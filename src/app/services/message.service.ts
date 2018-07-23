import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Message } from '../models/message';

@Injectable({ providedIn: 'root' })
export class MessageService {
  API_URL: string = environment.API_URL;

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<Message[]> {
    return this.http.get<Message[]>(this.API_URL);
  }
}