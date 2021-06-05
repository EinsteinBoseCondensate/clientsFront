import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { StaticModule } from './routes/static/static.module';
import { AppSettingsService } from './shared/services/app-settings.service';
import { SharedModule } from './shared/shared.module';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    RoutesModule
  ],
  providers: [AppSettingsService,
    {
        provide: APP_INITIALIZER,
        useFactory: (service: AppSettingsService) => () => service.load(),
        deps: [AppSettingsService], multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
 }
