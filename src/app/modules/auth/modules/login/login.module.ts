import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './containers/login-form/login-form.component';

const ROUTES: Routes = [{ path: '', component: LoginFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(ROUTES), CommonModule, FormsModule],
  declarations: [LoginFormComponent]
})
export class LoginModule {}
