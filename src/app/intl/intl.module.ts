import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';

import { IntlRoutingModule } from './intl-routing.module';
import { TermsComponent } from './terms/terms.component';
import { ComlawComponent } from './comlaw/comlaw.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TermsComponent,
    ComlawComponent,
    PrivacyComponent,
    HelpComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    IntlRoutingModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatStepperModule,
    SharedModule
  ]
})
export class IntlModule {}
