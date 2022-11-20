import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HelpComponent } from './components/help/help.component';
import { InterceptorService } from './services/backend/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    TasksComponent,
    NavigationComponent,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule.forRoot({ defaults: {} }),
  ],
  providers: [
    {
      provide: 'HTTP_INTERCEPTORS',
      useClass: InterceptorService,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
