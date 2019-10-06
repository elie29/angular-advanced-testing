import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

import { RegisterValidator } from '../../validators/register.valdiator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {
  form: FormGroup = this.fb.group({
    name: this.fb.group(
      {
        firstName: [''],
        lastName: ['', Validators.maxLength(8)]
      },
      {
        validator: RegisterValidator.requiredName
      }
    ),
    email: ['', Validators.email, RegisterValidator.forbiddenEmail],
    password: ['', [Validators.required, RegisterValidator.strongPassword]],
    languages: this.fb.array(
      [this.addControlLanguage('FR'), this.addControlLanguage('EN')],
      Validators.compose([Validators.required, Validators.maxLength(5)])
    )
  });
  // Error message
  message: string;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  get languages(): FormArray {
    return this.form.get('languages') as FormArray;
  }

  addLanguage(): void {
    this.languages.push(this.addControlLanguage());
  }

  removeLanguage(index: number): void {
    this.languages.removeAt(index);
  }

  // FormControl Accessors
  // ---------------------

  accessed(control: AbstractControl): boolean {
    return control.touched || control.dirty;
  }

  get isNameIsEmpty(): boolean {
    const name = this.form.get('name');
    return this.accessed(name) && name.hasError('emptyName');
  }

  get isLastNameMaxLength(): boolean {
    const lastName = this.form.get('name.lastName');
    return this.accessed(lastName) && lastName.hasError('maxlength');
  }

  get emailRequiredOrForbidden(): string {
    const email: AbstractControl = this.form.get('email');
    if (this.accessed(email) && email.hasError('email')) {
      return 'Email is not valid';
    }
    if (this.accessed(email) && email.hasError('forbiddenEmail')) {
      return 'Email is forbidden';
    }
    return null;
  }

  get passwordRequiredOrStrong(): string {
    const password: AbstractControl = this.form.get('password');
    if (this.accessed(password) && password.hasError('required')) {
      return 'Password is required';
    }
    if (this.accessed(password) && password.hasError('strongPassword')) {
      return 'Password is not strong';
    }
    return null;
  }

  onRegister(): void {
    this.message = '';
    this.loading = true;
    if (this.form.valid) {
      const subscription = this.authService
        .createUser(this.form.value)
        .subscribe(next => {
          this.message = next;
          this.loading = false;
          subscription.unsubscribe();
          if (!next) {
            // Pas d'erreur
            this.router.navigate(['/']);
          }
        });
    }
  }

  private addControlLanguage(lang: string = ''): AbstractControl {
    return this.fb.control(lang, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(4)
    ]);
  }
}
