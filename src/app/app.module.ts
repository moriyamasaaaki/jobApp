import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NotFoundComponent } from './not-found/not-found.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { StripeComponent } from './stripe/stripe/stripe.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './footer/footer.component';

// //アルゴリア関連モジュール
import { NgAisModule } from 'angular-instantsearch';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchInputComponent } from './search-input/search-input.component';
import { SearchComponent } from '../app/home/search/search.component';
import { SearchResultComponent } from './search-result/search-result.component';
// ストライプ
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentComponent } from './stripe/payment/payment.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    DeleteDialogComponent,
    ProfileDialogComponent,
    StripeComponent,
    PaymentComponent,
    SearchResultComponent,
    SearchInputComponent,
    SearchComponent,
    FooterComponent,
    AuthDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    NgAisModule.forRoot(),
    MatAutocompleteModule,
    MatTooltipModule,
    NgxStripeModule.forRoot('pk_test_9HpgVwuc2WJTcyFgqugNOF3N002BxciwCC'),
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [Title, Meta],
  bootstrap: [AppComponent],
  entryComponents: [
    DeleteDialogComponent,
    ProfileDialogComponent,
    StripeComponent,
    PaymentComponent,
    AuthDialogComponent
  ]
})
export class AppModule {}
