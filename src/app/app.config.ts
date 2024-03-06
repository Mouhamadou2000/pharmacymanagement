import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './cart/cart.component';

const route = [
  { path: 'list1', component: ProductListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart1', component: CartComponent },
  { path: '', component: InscriptionComponent },
  // Ajoutez d'autres routes ici
];
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideClientHydration(),importProvidersFrom(HttpClientModule),
    importProvidersFrom(RouterModule.forRoot(route)),
  ]
};
