import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';

import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

import {
  CustomPageTitleProvider,
  HttpRequestInterceptor,
  HttpResponseInterceptor,
  LangService,
} from '@shared';
import { routes } from './app.routes';

export function initializeLangFactory() {
  const langService = inject(LangService);
  const lang = langService.currentLanguage();
  return () => langService.switchLanguage(lang);
}

export function translateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `assets/i18n/`, '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    ConfirmationService,
    CustomPageTitleProvider,
    DynamicDialogConfig,
    DynamicDialogRef,
    DialogService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideRouter(
      routes,
      withViewTransitions(),
      withComponentInputBinding(),
      withRouterConfig({
        onSameUrlNavigation: 'ignore',
        paramsInheritanceStrategy: 'always',
      }),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([HttpResponseInterceptor, HttpRequestInterceptor])
    ),
    importProvidersFrom(
      LoadingBarHttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: translateLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideAppInitializer(() => {
      const initializerFn = initializeLangFactory();
      return initializerFn();
    }),
  ],
};
