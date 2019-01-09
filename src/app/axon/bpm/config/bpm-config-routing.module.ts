import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConfigComponent} from './config/config.component'
import {SchemasComponent} from './schemas/schemas.component'
import {SchemaComponent} from './schema/schema.component'
import {AuthGuard} from '@app/annette/core';

const routes: Routes = [
  {
    path: '',
    component: ConfigComponent,
    data: { title: 'axon.bpm-config.title' },
    children: [
      {
        path: '',
        redirectTo: 'schemas',
        pathMatch: 'full'
      },
      {
        path: 'schemas',
        component: SchemasComponent,
        data: { title: 'axon.bpm-config.schemas' },
        canActivate: [AuthGuard]
      },
      {
        path: 'schema/:action/:id',
        component: SchemaComponent,
        data: { title: 'axon.bpm-config.schemas' },
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BpmConfigRoutingModule { }
