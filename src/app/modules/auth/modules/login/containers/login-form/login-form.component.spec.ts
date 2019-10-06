import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@store';
import {
  API_URL,
  AuthService
} from 'src/app/modules/auth/services/auth.service';

import { LoginFormComponent } from './login-form.component';

const routerMock = {
  navigate: console.log
};

describe('LoginFormComponent unit test', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        Store,
        AuthService,
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: API_URL,
          useValue: 'api.org'
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit form', () => {
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form'));

    form.triggerEventHandler('ngSubmit', null);

    expect(component.message).toBeTruthy();

    fixture.detectChanges();

    const message = fixture.debugElement.query(By.css('div.message'));
    expect(message.nativeElement.textContent).toContain('Invalid');
  });

  it('should submit form', () => {
    component.form = new FormGroup({
      email: new FormControl('admin@admin.com'),
      password: new FormControl('admin')
    });
    component.onLogin();

    expect(component.message).toBeFalsy();

    fixture.detectChanges();

    const message = fixture.debugElement.query(By.css('div.message'));
    expect(message).toBeNull();
  });
});
