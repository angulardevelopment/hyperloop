import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { environment } from './environments/environment';
import 'hammerjs';
import { AppRoutingModule } from './app/app_routing.module';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    importProvidersFrom(
      AppRoutingModule,
      NgxSpinnerModule,
      MatSnackBarModule
    )
  ]
}).catch(err => console.log(err));
