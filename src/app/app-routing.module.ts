import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameHistoryComponent } from './components/game-history/game-history.component';
import { StandingsComponent } from './components/standings/standings.component';

const routes: Routes = [
  { path: 'standings', component: StandingsComponent },
  { path: 'game-history', component: GameHistoryComponent },
  { path: '', redirectTo: '/standings', pathMatch: 'full' },
  { path: '**', component: StandingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
