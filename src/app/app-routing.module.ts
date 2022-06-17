import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectComponent } from './components/home/project/project.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'project/:package', component: ProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
