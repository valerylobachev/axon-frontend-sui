import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from '@app/annette/settings';
import { AuthGuard } from '@app/annette/core/auth/auth.guard';
import { LayoutComponent } from '@app/annette/layout';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
     {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full'
      },
      {
        path: 'projects',
        loadChildren: 'app/axon/projects/projects.module#ProjectsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'bpm',
        loadChildren: 'app/axon/bpm/main/bpm.module#BpmModule',
        canActivate: [AuthGuard]
      },
    /*  {
        path: 'org-structure',
        loadChildren:
          'app/org-structure/org-structure.module#OrgStructureModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'projects',
        loadChildren: 'app/projects/projects.module#ProjectsModule',
        canActivate: [AuthGuard]
      },*/
      {
        path: 'bpm-config',
        loadChildren: 'app/axon/bpm/config/bpm-config.module#BpmConfigModule',
        canActivate: [AuthGuard]
      },
     /* {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule',
        canActivate: [AuthGuard]
      },*/
      {
        path: 'settings',
        component: SettingsComponent,
        data: { title: 'axon.menu.settings' },
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        redirectTo: 'bpm'
      }
    ]
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
