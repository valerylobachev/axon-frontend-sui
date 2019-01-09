import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';


import { BpmConfigRoutingModule } from './bpm-config-routing.module';
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../../environments/environment'
import { ConfigComponent } from './config/config.component';
import { SchemasComponent } from './schemas/schemas.component';
import {BpmSharedModule} from '../shared/bpm-shared.module';
import { SchemaComponent } from './schema/schema.component'
import {BpmnEditComponent} from './schema/bpmn-view/bpmn-edit.component'
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader'
import {SharedModule} from '@app/annette/shared';
import {DEFAULT_LANGUAGE} from '@app/annette/shared/languages';

@NgModule({
  imports: [
    SharedModule,
    BpmConfigRoutingModule,
    BpmSharedModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  declarations: [
      ConfigComponent,
      SchemasComponent,
      SchemaComponent,
      BpmnEditComponent
  ]
})
export class BpmConfigModule {
  constructor(translate: TranslateService) {
    translate.use(DEFAULT_LANGUAGE)
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    {prefix: `${environment.i18nPrefix}/assets/i18n/`, suffix: '.json'},
    {prefix: `${environment.i18nPrefix}/assets/i18n/bpm/`, suffix: '.json'},
  ]);
}
