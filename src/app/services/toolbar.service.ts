import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  onPinEntered: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  pinEntered(correctPin: boolean) {
    this.onPinEntered.emit(correctPin);
  }

}
