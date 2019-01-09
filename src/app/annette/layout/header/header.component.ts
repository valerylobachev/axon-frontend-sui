import {Component, EventEmitter, HostBinding, OnDestroy, OnInit, Output} from '@angular/core';

import {
  ActionSettingsChangeAnimationsPageDisabled,
  ActionSettingsChangeLanguage,
  ActionSettingsPersist, Language, selectorSettings, SettingsState
} from '../../settings';
import {select, Store} from '@ngrx/store'
import {AnimationsService, AuthService, selectorAuth, TitleService} from '../../core'
import {TranslateService} from '@ngx-translate/core'
import {takeUntil} from 'rxjs/operators'
import {Subject} from 'rxjs'
import browser from 'browser-detect'
import {DEFAULT_LANGUAGE, LANGUAGES} from '../../shared/languages'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @HostBinding('attr.class') classes = 'ui inverted fixed blue menu'

  private unsubscribe$: Subject<void> = new Subject<void>();

  @Output()
  toggleSidebar = new EventEmitter<void>();

  kcProfile: Keycloak.KeycloakProfile
  isAuthenticated: boolean;

  languages = LANGUAGES;

  settings: SettingsState;


  constructor(
      private store: Store<any>,
      private titleService: TitleService,
      private animationService: AnimationsService,
      private translate: TranslateService,
      private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);;
    this.subscribeToAuth();
    this.subscribeToSettings();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  private subscribeToAuth() {
    this.store
        .pipe(select(selectorAuth), takeUntil(this.unsubscribe$))
        .subscribe(auth => {
          console.log(auth)
          this.isAuthenticated = auth.isAuthenticated
          this.kcProfile = auth.profile
        });
  }

  private static isIEorEdge() {
    return ['ie', 'edge'].includes(browser().name);
  }


  private subscribeToSettings() {
    if (HeaderComponent.isIEorEdge()) {
      this.store.dispatch(
          new ActionSettingsChangeAnimationsPageDisabled({
            pageAnimationsDisabled: true
          })
      );
    }
    this.store
        .pipe(select(selectorSettings), takeUntil(this.unsubscribe$))
        .subscribe(settings => {
          this.settings = settings;
          this.setLanguage(settings);
          this.animationService.updateRouteAnimationType(
              settings.pageAnimations,
              settings.elementsAnimations
          );
        });
  }


  private setLanguage(settings: SettingsState) {
    const { language } = settings;
    if (language) {
      this.translate.use(language);
    }
  }

  onLogoutClick() {
    this.authService.logout()
  }

  onProfileClick() {
    this.authService.profile()
  }

  onLanguageSelect(lang: Language) {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language: lang }));
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }
}
