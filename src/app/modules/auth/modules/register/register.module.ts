import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { RegisterFormComponent } from './containers/register-form/register-form.component';

const ROUTES: Routes = [{ path: '', component: RegisterFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(ROUTES), ReactiveFormsModule, CommonModule],
  declarations: [RegisterFormComponent]
})
export class RegisterModule {}
