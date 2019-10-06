import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@store';
import {
  API_URL,
  AuthService
} from 'src/app/modules/auth/services/auth.service';

import { RegisterFormComponent } from './register-form.component';

const routerMock = {
  navigate: console.log
};

describe('RegisterFormComponent unit test', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
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
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return languages', () => {
    expect(component.languages.length).toBe(2);
  });

  it('should add a language', () => {
    component.addLanguage();
    expect(component.languages.length).toBe(3);
  });

  it('should remove a language', () => {
    component.removeLanguage(1);
    expect(component.languages.length).toBe(1);
  });

  it('should test a FormControl', () => {
    const email = component.form.get('email');
    expect(component.accessed(email)).toBeFalsy();

    email.markAsTouched();
    expect(component.accessed(email)).toBeTruthy();
  });

  it('should test if name is empty', () => {
    const name = component.form.get('name');
    expect(component.isNameIsEmpty).toBeFalsy();

    name.markAsTouched();
    expect(component.isNameIsEmpty).toBeTruthy();

    fixture.detectChanges();
    const message = fixture.debugElement.query(
      By.css('div.ui.negative.message')
    );
    expect(message.nativeElement.textContent).toContain(
      'Firstname and Lastname are required'
    );
  });

  it('should test lastname max length', () => {
    const name = component.form.get('name.lastName');
    expect(component.isLastNameMaxLength).toBeFalsy();

    name.markAsTouched();
    // use patchValue on form to just appear last name error
    component.form.patchValue({
      name: {
        firstName: 'elie',
        lastName: 'abcdefghtiu'
      }
    });
    expect(component.isLastNameMaxLength).toBeTruthy();

    fixture.detectChanges();
    const message = fixture.debugElement.query(
      By.css('div.ui.negative.message')
    );
    expect(message.nativeElement.textContent).toContain('Lastname max length');
  });

  it('should test if email is required', () => {
    const email = component.form.get('email');
    email.markAsDirty();
    email.setErrors({ email: true });

    expect(component.emailRequiredOrForbidden).toBeTruthy();
  });

  it('should test if email is forbidden', () => {
    const email = component.form.get('email');
    email.markAsDirty();
    email.setErrors({ forbiddenEmail: true });

    expect(component.emailRequiredOrForbidden).toBeTruthy();
  });

  it('should test if email is forbidden', fakeAsync(() => {
    const email = component.form.get('email');
    email.markAsDirty();
    email.setValue('test@test.com');

    tick(550); // wait for timer

    expect(component.emailRequiredOrForbidden).toBeTruthy();

    // fixture.detectChanges(); error with asyncValidators
  }));

  it('should detect strong password', () => {
    const password = component.form.get('password');
    password.markAsDirty();
    expect(component.passwordRequiredOrStrong).toBeTruthy();

    password.setValue('125');
    expect(component.passwordRequiredOrStrong).toBeTruthy();

    password.setValue('M.a1');
    expect(component.passwordRequiredOrStrong).toBeFalsy();
  });

  it('should call onRegister', fakeAsync(() => {
    const service: AuthService = TestBed.get(AuthService);
    spyOn(service, 'createUser').and.callThrough();

    component.form.patchValue({
      name: {
        firstName: 'elie',
        lastName: 'abcdefg'
      },
      email: 'elie29@test.com',
      password: 'A.m1'
    });
    tick(550);

    expect(component.form.valid).toBeTruthy();
    component.onRegister();

    expect(service.createUser).toHaveBeenCalled();
  }));
});
