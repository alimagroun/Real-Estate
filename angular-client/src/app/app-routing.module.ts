import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page403Component } from './page403/page403.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {UsersListComponent} from './users-list/users-list.component';
import {AddPropertyComponent} from './add-property/add-property.component';
import {PropertyListComponent} from './property-list/property-list.component';
import {PropertyDetailsComponent} from './property-details/property-details.component';
import {UpdatePropertyComponent} from './update-property/update-property.component';
import {PropertySearchComponent} from './property-search/property-search.component';
import { HomeComponent } from './home/home.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { PropertyListingComponent } from './property-listing/property-listing.component';
import { DefaultHeaderComponent } from './containers/default-layout/default-header/default-header.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SavedSearchesComponent } from './saved-searches/saved-searches.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';

import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard } from './_guards/admin.guard';
import { PropertyAuthorizationGuard } from './_guards/property-authorization.guard';
import { UnauthenticatedGuard } from './_guards/unauthenticated.guard';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'PasswordRecovery', component: PasswordRecoveryComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'yourproperties',
        component: PropertyListingComponent,
        data: {
          title: 'Your Properties',
        },
        canActivate: [AuthGuard]
       },
       {
        path: 'favorites',
        component: FavoritesComponent,
        data: {
          title: 'Favorites',
        },
        canActivate: [AuthGuard]
       },
       {
        path: 'savedsearches',
        component: SavedSearchesComponent,
        data: {
          title: 'Saved Searches',
        },
        canActivate: [AuthGuard]
       },
       {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'Home',
        }
       },
       {
        path: 'messagelist',
        component: MessageListComponent,
        data: {
          title: 'MessageList',
        },
        canActivate: [AdminGuard]
       },
       {
        path: 'messagedetails/:id',
        component: MessageDetailsComponent,
        data: {
          title: 'Message Details',
        },
        canActivate: [AdminGuard]
      },
       {
        path: 'contactus',
        component: ContactFormComponent,
        data: {
          title: 'Contact us',
        }
       },
       { path: 'profile', component: ProfileComponent },
      {
        path: 'property/:propertyId',
        loadChildren: () =>
          import('./property-details/property-details.module').then((m) => m.PropertyDetailsModule)
      },
      {
        path: 'updateproperty/:propertyId',
        component: UpdatePropertyComponent,
        data: {
          title: 'Update Property'
        },
        canActivate: [PropertyAuthorizationGuard]
      },
      {
      path: 'propertysearch',
      component: PropertySearchComponent,
      data: {
        title: 'Search Property'
      }
     },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'addproperty',
        loadChildren: () =>
          import('./add-property/add-property.module').then((m) => m.AddPropertyModule),
          canActivate: [AuthGuard]
      },
      {
      path: 'propertylist',
      loadChildren: () =>
        import('./property-list/property-list.module').then((m) => m.PropertyListModule),
        canActivate: [AdminGuard]
    },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '403',
    component: Page403Component,
    data: {
      title: 'Page 403'
    }
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
   {
    path: 'users',
    component: UsersListComponent,
    data: {
      title: 'users list'
    }
  },
  {
    path: 'propertylist',
    component: PropertyListComponent,
    data: {
      title: 'property list'
    }
    
  },
  {
    path: 'property',
    component: PropertyDetailsComponent,
    children: [
      {
        path: 'header',
        component: DefaultHeaderComponent,
        outlet: 'header'
      }
    ],
    data: {
      title: 'property'
    }
  
  },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
