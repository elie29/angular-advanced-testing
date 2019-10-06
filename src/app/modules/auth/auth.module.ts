import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { API_URL } from './services/auth.service';

const ROUTES: Routes = [
  {
    path: 'auth',
    canActivate: [AuthGuard], // Access allowed for logged out users
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login',
        loadChildren: () =>
          import('./modules/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./modules/register/register.module').then(
            m => m.RegisterModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES), HttpClientModule],
  providers: [
    {
      provide: API_URL,
      useValue: 'https://httpbin.org/post'
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AuthModule {}
