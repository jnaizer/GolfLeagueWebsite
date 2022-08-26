import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInDialogComponent } from './log-in-dialog/log-in-dialog.component';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AboutDialogueComponent } from './about-dialogue/about-dialogue.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from "@angular/fire/compat";


@NgModule({
  declarations: [
    AppComponent,
    LogInDialogComponent,
    TableComponent,
    FormComponent,
    ToolbarComponent,
    AboutDialogueComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
	  MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
	  provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
