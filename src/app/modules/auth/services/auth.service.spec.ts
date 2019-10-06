import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from '@services/user.model';
import { Store } from '@store';
import { Subscription } from 'rxjs';

import { API_URL, AuthService } from './auth.service';

describe('AuthService unit test', () => {
  let service: AuthService;
  let http: HttpTestingController;
  let store: Store;
  let subscription: Subscription;

  beforeAll(() => {
    localStorage.removeItem('user');
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        Store,
        {
          provide: API_URL,
          useValue: 'http://api.org',
        },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(AuthService);
    http = TestBed.get(HttpTestingController);
    store = TestBed.get(Store);
    subscription = new Subscription();
  });

  afterEach(() => {
    // Verify that no unmatched requests are outstanding
    http.verify();
    localStorage.removeItem('user');
    subscription.unsubscribe();
  });

  it('should not login user', () => {
    const res = service.loginUser('test@test.com', '123456');
    expect(res).toBeFalsy();
  });

  it('should login user', () => {
    const res = service.loginUser('admin@admin.com', 'admin');
    expect(res).toBeTruthy();
    expect(store.get<User>('user').authenticated).toBeTruthy();
  });

  it('should logout user', () => {
    service.logoutUser();
    expect(store.get('user')).toBeNull();
  });

  it('should fill local storage', () => {
    service.checkUserInLocalStorage();
    expect(store.get<User>('user')).toBeNull();

    localStorage.setItem('user', 'admin@admin.com');
    service.checkUserInLocalStorage();
    expect(store.get<User>('user').authenticated).toBeTruthy();
  });

  it('should createUser', () => {
    const data = { email: 'elie29@gmail.com', firstname: 'Elie' };
    let message = null;

    // Call the service
    service.createUser(data).subscribe(next => (message = next));

    const req = http.expectOne('http://api.org?user=admin&limit=1');
    req.flush(data);

    expect(req.request.method).toBe('POST');
    expect(message).toBeFalsy();
    expect(store.value.user.authenticated).toBeTruthy();
  });
});
