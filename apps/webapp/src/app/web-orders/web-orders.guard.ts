import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';

import { WebOrdersState } from './web-orders.types';
import { Account, AccountService, getAccount } from '../account';

@Injectable({ providedIn: 'root' })
export class WebOrdersGuard implements CanActivate {
  private account?: Account;

  constructor(
    private store: Store<WebOrdersState>,
    private accountService: AccountService,
  ) {
    this.store
      .select(getAccount)
      .subscribe(account => (this.account = account));
  }

  canActivate(): boolean {
    if (!this.account) {
      this.accountService.logout();
      return false;
    }

    return true;
  }
}
