import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { TokenInterceptorInterceptor } from './core/token-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(), 
    provideHttpClient(),
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorInterceptor,
    multi: true
  }],
};
