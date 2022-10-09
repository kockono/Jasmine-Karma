import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PinsService {
  private actionObserver = new Subject();
  public $actionObserver = this.actionObserver.asObservable();
  private _action: string = "";

  get action() {
    return this._action;
  }

  set action(value:any) {
    this._action = value;
  }

  public resolveActionObserver(value:any) {
    this.actionObserver.next(value);
  }
}
