import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoadingService } from './shared/services/loading.service';
import { AuthInterceptor } from './shared/utils/interceptors/auth.interceptor';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducers } from './reducers';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([AuthInterceptor])), LoadingService, provideStore(reducers), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
