import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  _authorizedUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  authorizedUser: Observable<boolean> = this._authorizedUser.asObservable();

  constructor() { }

  pinEntered(correctPin: boolean) {
    this._authorizedUser.next(correctPin);
  }

}
