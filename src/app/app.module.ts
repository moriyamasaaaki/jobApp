import { BrowserModule } from '@angular/platform-browser';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// //アルゴリア関連モジュール
import { NgAisModule } from 'angular-instantsearch';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

// ストライプ
import { NgxStripeModule } from 'ngx-stripe';
import { SubscriptionComponent } from './stripe/subscription/subscription.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    DeleteDialogComponent,
    StripeComponent,
    SubscriptionComponent
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
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DeleteDialogComponent,
    StripeComponent,
    SubscriptionComponent
  ]
})
export class AppModule {}
