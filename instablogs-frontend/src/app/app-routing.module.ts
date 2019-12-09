import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { BlogPostComponent } from './Blogs/blog-post/blog-post.component';
import { BlogPostAddEditComponent } from './Blogs/blog-post-add-edit/blog-post-add-edit.component';
import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';
import { LoginComponent } from './Dashboard/login/login.component';
import { ModeratorComponent } from './Moderator/moderator/moderator.component';

export function onAuthRequired({ oktaAuth, router }) {
  router.navigate(['/login']);
}

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'blogpost/:id', component: BlogPostComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired }},
  { path: 'add', component: BlogPostAddEditComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired }},
  { path: 'login', component: LoginComponent},
  { path: 'implicit/callback', component: OktaCallbackComponent},
  { path: 'moderator', component: ModeratorComponent, canActivate: [OktaAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
