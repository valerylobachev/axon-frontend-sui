import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { cold } from 'jasmine-marbles';

import { SettingsEffects } from './settings.effects';
import { AnimationsService, LocalStorageService } from '../core';
import {
  SettingsActionTypes,
  SETTINGS_KEY
} from 'settings.reducer';
import {
  ActionSettingsPersist,
  SettingsState,
  ActionSettingsChangeLanguage
} from 'index';

describe('SettingsEffects', () => {
  let actions$: Observable<Action>;
  let effects: SettingsEffects;
  let metadata: EffectsMetadata<SettingsEffects>;
  let localStorageService: any;
  let animationsService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SettingsEffects,
        provideMockActions(() => actions$),
        {
          provide: LocalStorageService,
          useValue: jasmine.createSpyObj('LocalStorageService', ['setItem'])
        },
        {
          provide: AnimationsService,
          useValue: jasmine.createSpyObj('AuthService', [
            'updateRouteAnimationType'
          ])
        }
      ]
    });

    localStorageService = TestBed.get(LocalStorageService);
    animationsService = TestBed.get(AnimationsService);
    effects = TestBed.get(SettingsEffects);
  });

  it('should not dispatch any action', () => {
    metadata = getEffectsMetadata(effects);
    expect(metadata.persistSettings).toEqual({ dispatch: false });
  });

  it('should call methods on AnimationsService and LocalStorageService for PERSIST action', () => {
    const settings: SettingsState = {
      language: 'en',
      pageAnimations: true,
      elementsAnimations: true,
      theme: 'default',
      autoNightMode: false,
      pageAnimationsDisabled: true
    };

    const persistAction = new ActionSettingsPersist({ settings: settings });
    actions$ = cold('a', { a: persistAction });
    effects.persistSettings().subscribe(() => {
      expect(localStorageService.setItem).toHaveBeenCalledWith(
        SETTINGS_KEY,
        persistAction.payload.settings
      );
      expect(animationsService.updateRouteAnimationType).toHaveBeenCalledWith(
        true,
        true
      );
    });
  });

  it('should not call methods on AnimationsService and LocalStorageService for other actions', () => {
    const nonPersistAction: ActionSettingsChangeLanguage = new ActionSettingsChangeLanguage(
      { language: 'en' }
    );

    actions$ = cold('a-|', { a: nonPersistAction });
    effects.persistSettings().subscribe(undefined, undefined, () => {
      expect(localStorageService.setItem).not.toHaveBeenCalled();
      expect(animationsService.updateRouteAnimationType).not.toHaveBeenCalled();
    });
  });
});
