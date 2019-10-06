import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor unit test', () => {
  let http: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });
  });

  beforeEach(() => {
    http = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
  });

  afterEach(() => {
    // Verify that no unmatched requests are outstanding
    http.verify();
  });

  it('should return a cloned request', () => {
    // Make a fake request
    httpClient.get('/').subscribe();

    // Get the expectation
    const req = http.expectOne('/');

    // Test interceptor
    const token = req.request.headers.get('x-token');
    expect(token).toBeTruthy();
    expect(atob(token)).toBe('admin@admin.com');
  });
});
