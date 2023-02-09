import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

interface WOMenuState {
  open: boolean;
}

@Injectable({ providedIn: 'root' })
export class WOAppService {
  private _menuState = new BehaviorSubject<WOMenuState>({ open: true });
  get menuState(): Observable<WOMenuState> {
    return this._menuState;
  }

  changeMenuState(state: Partial<WOMenuState>) {
    this._menuState.next({ ...this._menuState.value, ...state });
  }

  constructor(private menuController: MenuController) {}

  toggleMenu() {
    this.menuController.toggle();
  }
}
