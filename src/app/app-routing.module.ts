import { HomeComponent } from './home/home.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";
import { NewListComponent } from "./new-list/new-list.component";
import { NewPostComponent } from "./new-post/new-post.component";


const routes: Routes = [
   { path: "", component: HomeComponent, canActivate: [AuthGuard] },
   { path: "new-list", component: NewListComponent, canActivate: [AuthGuard] },
   { path: "lists/:listId/new-post", component: NewPostComponent, canActivate: [AuthGuard] },
   { path: "lists/edit/:listId/:postId", component: NewPostComponent, canActivate: [AuthGuard] },
   { path: "login", component: LoginComponent },
   { path: "signup", component: SignupComponent },
   { path: 'lists/:listId', component: HomeComponent, canActivate: [AuthGuard] },
   { path: 'lists/:listId/:postId', component: HomeComponent, canActivate: [AuthGuard] },
    {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
