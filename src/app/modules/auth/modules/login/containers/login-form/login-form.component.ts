import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  @ViewChild('f', { static: false }) form: FormGroup;

  message = '';
  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    const { email, password } = this.form.value;

    this.form.reset();

    if (this.authService.loginUser(email, password)) {
      this.message = '';
      this.router.navigate(['/']);
      return;
    }

    this.message = 'Invalid email or password';
  }
}
