import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {HomeGuard} from './home/home.guard';

const appRoutes: Routes = [
  {
    path: 'entry',
    component: RegisterComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [HomeGuard]
  },
  { path: '**',
    redirectTo: 'entry',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [HomeGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
