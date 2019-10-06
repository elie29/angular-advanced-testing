import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { User } from '@services/user.model';
import { Store } from '@store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticlesGuard implements CanActivate, CanLoad {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select<User>('user').pipe(
      map(user => user && user.authenticated),
      map(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/auth/login']);
        }
        return authenticated;
      })
    );
  }

  canLoad(): Observable<boolean> {
    // Unsubscribe from store is required
    return this.canActivate().pipe(take(1));
  }
}
