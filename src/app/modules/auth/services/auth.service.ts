import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { createUser, User } from '@services/user.model';
import { Store } from '@store';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, mapTo } from 'rxjs/operators';

export const API_URL = new InjectionToken('api_url');
const ADMIN = 'admin@admin.com';

// needed in app and auth
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    @Inject(API_URL) private api: string,
    private store: Store,
    private http: HttpClient
  ) {}

  loginUser(email: string, password: string): boolean {
    const user = this.login(email, password);
    this.store.set('user', user);
    return user !== null;
  }

  logoutUser(): boolean {
    this.store.set('user', null);
    localStorage.removeItem('user');
    return true;
  }

  checkUserInLocalStorage(): void {
    const email = localStorage.getItem('user');
    if (email === ADMIN) {
      this.store.set('user', createUser(email));
    }
  }

  /**
   * @param data: Object that contains email, firstname, lastname
   *
   * @returns Resolved Observable with error message if occurred
   */
  createUser(data: any): Observable<string> {
    const params = new HttpParams().set('user', 'admin').set('limit', '1');

    return this.http.post(this.api, JSON.stringify(data), { params }).pipe(
      tap(_ => this.store.set('user', createUser(data.email))),
      mapTo(''),
      catchError(error => {
        this.logoutUser();
        return of(error.message);
      })
    );
  }

  private login(email: string, password: string): User | null {
    if (email === ADMIN && password === 'admin') {
      localStorage.setItem('user', email);
      return createUser(email);
    }
    return null;
  }
}
