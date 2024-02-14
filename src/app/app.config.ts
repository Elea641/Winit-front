import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { TokenInterceptorInterceptor } from './core/token-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true,
    },
    provideAnimations(), // required animations providers
    provideToastr({
      timeOut: 4000,
      progressBar: true,
      positionClass: 'toast-bottom-right',
      maxOpened: 4,
      autoDismiss: true,
      closeButton: true,
    }), // Toastr providers
  ],
};
