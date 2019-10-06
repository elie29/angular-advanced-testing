import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@store';
import { HeaderComponent } from 'src/app/components/header/header.component';
import {
  API_URL,
  AuthService
} from 'src/app/modules/auth/services/auth.service';

import { RootComponent } from './root.component';
import { createUser } from '@services/user.model';

const routerMock = {
  navigate: console.log
};

describe('AppComponent unit test', () => {
  let component: RootComponent;
  let fixture: ComponentFixture<RootComponent>;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RootComponent, HeaderComponent],
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        Store,
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: API_URL,
          useValue: 'api.org'
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should logout correctly', () => {
    spyOn(store, 'set');
    component.onLogout();
    expect(store.set).toHaveBeenCalled();
  });

  it('should subscribe to $user', () => {
    store.set('user', createUser('elie@elie.com'));

    fixture.detectChanges();

    const header = fixture.debugElement.query(By.directive(HeaderComponent));
    expect(header.nativeElement.textContent).toContain('Articles');

    store.set('user', null);

    fixture.detectChanges();
    expect(header.nativeElement.textContent).toContain('Login');
  });
});
