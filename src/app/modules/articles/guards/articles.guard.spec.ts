import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { createUser } from '@services/user.model';
import { Store } from '@store';
import { Subscription } from 'rxjs';

import { ArticlesGuard } from './articles.guard';

describe('ArticlesGuard unit test', () => {
  const fakeRouter = {
    navigate: console.log
  };

  let store: Store;
  let router: Router;
  let guard: ArticlesGuard;
  let subscription: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Store,
        ArticlesGuard,
        { provide: Router, useValue: fakeRouter }
      ]
    });
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    guard = TestBed.get(ArticlesGuard);
    subscription = new Subscription();
    spyOn(router, 'navigate');
  });

  afterEach(() => {
    subscription.unsubscribe();
  });

  it('should inject null user', () => {
    // Cold observable will emit on subscribe
    subscription.add(
      guard
        .canActivate()
        .subscribe(authenticated => expect(authenticated).toBeFalsy())
    );

    // Another user not authenticated
    const user = createUser('test');
    user.authenticated = false;
    store.set('user', user);

    expect(router.navigate).toHaveBeenCalledTimes(2);
  });

  it('should inject authenticated user', () => {
    store.set('user', createUser('elie29@gmail.com'));

    subscription.add(
      guard.canActivate().subscribe(authenticated => {
        expect(authenticated).toBeTruthy();
      })
    );

    // Another user
    store.set('user', createUser('elie29@hotmail.com'));

    expect(router.navigate).toHaveBeenCalledTimes(0);
  });

  it('should inject non authenticated user once for canLoad', () => {
    subscription.add(
      guard.canLoad().subscribe(authenticated => {
        expect(authenticated).toBeFalsy();
      })
    );

    // Another user has no effect on canLoad
    store.set('user', createUser('elie29@hotmail.com'));

    expect(router.navigate).toHaveBeenCalledTimes(1);
  });
});
