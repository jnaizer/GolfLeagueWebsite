import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInDialogComponent } from './components/log-in-dialog/log-in-dialog.component';
import { TableComponent } from './components/standings/table/table.component';
import { FormComponent } from './components/standings/form/form.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AboutDialogueComponent } from './components/about-dialogue/about-dialogue.component';
import { GameHistoryComponent } from './components/game-history/game-history.component';
import { GameCardComponent } from './components/game-history/game-card/game-card.component';
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
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from "@angular/fire/compat";

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LogInDialogComponent,
    TableComponent,
    FormComponent,
    ToolbarComponent,
    AboutDialogueComponent,
    StandingsComponent,
    GameHistoryComponent,
    GameCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
	  MatIconModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    FormsModule,
	  provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),  
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
