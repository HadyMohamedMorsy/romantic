import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { localStorageSignal } from '../../helpers';
import { ApiService } from '../global-services/api.service';
import { LoginData, User } from './service-types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  #api = inject(ApiService);

  /*****************************************/

  #userIdToVerifyOtpLogin = signal<null | number>(null);
  userId = this.#userIdToVerifyOtpLogin.asReadonly();

  /*****************************************/
  // current user
  #CURRENT_USER_KEY = 'current-user-key';
  #currentUser = localStorageSignal<User | null>(null, this.#CURRENT_USER_KEY);

  currentUser = this.#currentUser.asReadonly(); // exposed publicly.
  currentUserId = computed(() => this.#currentUser()?.id);

  setCurrentUser(user: User | null) {
    this.#currentUser.set(user);
  }
  /*****************************************/


  #ACCESS_TOKEN_KEY = 'bussness-app-access-token-key';

  #accessToken = localStorageSignal<string | null>(
    null,
    this.#ACCESS_TOKEN_KEY,
  );

  accessToken = this.#accessToken.asReadonly();

  updateAccessToken(token: string | null) {
    this.#accessToken.set(token);
  }

  /*****************************************/

  isLoggedIn = computed<boolean>(() => !!this.accessToken());

  /*****************************************/

  effectSidebar = effect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width',
      this.isLoggedIn() ? '18rem' : '32rem',
    );
  });

  /*****************************************/

  #PERMISSIONS_KEY = 'permissions-key';
  #userPermissions = localStorageSignal<string[] | null>(
    null,
    this.#PERMISSIONS_KEY,
  );

  userPermissions = this.#userPermissions.asReadonly(); // exposed publicly.

  updateUserPermissions(permissions: string[] | null) {
    this.#userPermissions.set(permissions);
  }

  login(credentials: any) {
    return this.#api
      .request('post', 'auth/login', credentials)
      .pipe(tap(({ data }) => this.#userIdToVerifyOtpLogin.set(data.id)));
  }

  forgetPassword(credentials: any) {
    return this.#api.request('post', 'auth/forget-password', credentials);
  }

  resetPassword(credentials: any) {
    return this.#api.request('post', 'auth/reset-password', credentials);
  }

  verifyOtp(credentials: any) {
    return this.#api
      .request('post', 'auth/verify-otp', credentials)
      .pipe(tap(({ data }) => this.doLogin(data)));
  }

  logout() {
    return this.#api
      .request('post', 'auth/logout', {})
      .pipe(tap(() => this.doLogout()));
  }

  doLogin(data: LoginData) {
    this.setCurrentUser(data.user);
    this.updateAccessToken(data.accessToken);
  }

  doLogout() {
    this.setCurrentUser(null);
    this.updateAccessToken(null);
  }
}
