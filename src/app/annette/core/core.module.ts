import {APP_INITIALIZER, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {MetaReducer, Store, StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { storeFreeze } from 'ngrx-store-freeze';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../../../environments/environment';

import { debug } from './meta-reducers/debug.reducer';
import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { LocalStorageService } from './local-storage/local-storage.service';
import { authReducer } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';
import { AnimationsService } from './animations/animations.service';
import { TitleService } from './title/title.service';
import {AuthGuard} from './auth/auth.guard'
import {initializer} from './auth/auth-initializer'
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular'
import {AuthService} from './auth/auth.service'

export const metaReducers: MetaReducer<any>[] = [initStateFromLocalStorage];

if (!environment.production) {
  metaReducers.unshift(storeFreeze);
  if (!environment.test) {
    metaReducers.unshift(debug);
  }
}

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(
      {
        auth: authReducer
      },
      { metaReducers }
    ),
    EffectsModule.forRoot([AuthEffects]),

    // 3rd party
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    // keycloak
    KeycloakAngularModule
  ],
  declarations: [],
  providers: [
    AuthService,
    LocalStorageService,
    AnimationsService,
    TitleService,
    AuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService, AuthService]
    }
  ],
  exports: [
      TranslateModule
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}
