import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { WebOrdersState } from '../../../web-orders/web-orders.types';
import { login } from '../../store/account.actions';

@Component({
  selector: 'wo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  /**
   * Form with the data to login.
   */
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  /**
   * Whether the login is in process.
   */
  loggingIn = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<WebOrdersState>,
  ) {}

  ngOnInit(): void {
    this.reset();
  }

  ngOnDestroy(): void {
    this.reset();
  }

  /**
   * Logs the user in using the data in the form.
   */
  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loggingIn = true;

    this.store.dispatch(
      login({
        username: this.loginForm.controls['username'].value!,
        password: this.loginForm.controls['password'].value!,
        targetRoute: '',
        onSuccess: () => this.reset(),
        onError: error => this.onError(error),
      }),
    );
  }

  /**
   * Callback of an unsuccessful login.
   * @param error the error object.
   * @private
   */
  private onError(error: any): void {
    this.loggingIn = false;
  }

  /**
   * Resets the component.
   * @private
   */
  private reset(): void {
    this.loginForm.reset();
    this.loggingIn = false;
  }
}
