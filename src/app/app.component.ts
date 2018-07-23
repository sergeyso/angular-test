import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from './services/message.service';
import { TimerService } from './services/timer.service';

import { Message } from './models/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular Test';
  messages: Message[] = [];

  constructor(
    private domSanitizer: DomSanitizer,
    private messageService: MessageService,
    private timerService: TimerService,
  ) {}

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.messageService.getAll().subscribe(messages => 
      this.messages = messages.map(message => this.mapMessage(message))
    );
  }

  mapMessage(message: Message): Message {
    // check if message image or just text
    message.type = this.isBase64(message.message) ? 'image' : 'text';

    if (message.type === 'image') {
      message.message = this.domSanitizer.bypassSecurityTrustResourceUrl(message.message);
    }

    // Subscribe on delete message by event 
    this.timerService.removeAfter(message).subscribe(message => {
      const messageIndex = this.messages.indexOf(message);
      this.messages.splice(messageIndex, 1);
    });

    return message;
  }

  isBase64(message: string): boolean {
    return !!message.match(/^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i);
  }
}
