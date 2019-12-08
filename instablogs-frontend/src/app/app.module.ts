import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavToolbarComponent } from './Dashboard/nav-toolbar/nav-toolbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { OktaAuthModule } from '@okta/okta-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { LoginComponent } from './Dashboard/login/login.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { ModeratorComponent } from './Moderator/moderator/moderator.component';
import { BlogPostComponent } from './Blogs/blog-post/blog-post.component';
import { BlogPostAddEditComponent } from './Blogs/blog-post-add-edit/blog-post-add-edit.component';
import { BlogPostService } from './Services/blog-post.service';
import { AuthInterceptor } from './AuthInterceptor';
import { RevokeAccessComponent } from './Moderator/revoke-access/revoke-access.component';
import { GrantAccessComponent } from './Moderator/grant-access/grant-access.component';
import { AuthorsListComponent } from './Moderator/authors-list/authors-list.component';
import { ViewersListComponent } from './Moderator/viewers-list/viewers-list.component';
import { AuthorService } from './Services/author.service';
import { OktaApiService } from './Services/okta-api.service';

@NgModule({
  declarations: [
    AppComponent,
    NavToolbarComponent,
    LoginComponent,
    DashboardComponent,
    ModeratorComponent,
    BlogPostComponent,
    BlogPostAddEditComponent,
    RevokeAccessComponent,
    GrantAccessComponent,
    AuthorsListComponent,
    ViewersListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    OktaAuthModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    OktaAuthModule.initAuth({
      issuer: 'https://dev-194696.okta.com/oauth2/default',
      redirectUri: 'http://localhost:4200/implicit/callback',
      clientId: '0oa21xmyc30adPRbZ357'
    })
  ],
  providers: [BlogPostService, AuthorService, OktaApiService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
