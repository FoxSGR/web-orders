import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  get history$(): Observable<string[]> {
    return this._history$.asObservable();
  }
  private _history$ = new BehaviorSubject<string[]>([]);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this._history$.next([...this._history$.value, event.urlAfterRedirects]);
      });
  }

  history(): string[] {
    return [...this._history$.value];
  }

  lastRouteBefore(regex: RegExp): string | undefined {
    return [...this._history$.value].reverse().find(path => !path.match(regex));
  }
}
