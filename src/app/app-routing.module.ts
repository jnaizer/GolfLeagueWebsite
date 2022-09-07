import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameHistoryComponent } from './components/game-history/game-history.component';
import { PlayerRecordsComponent } from './components/player-records/player-records.component';
import { StandingsComponent } from './components/standings/standings.component';

const routes: Routes = [
  { path: 'standings', component: StandingsComponent },
  { path: 'game-history', component: GameHistoryComponent },
  { path: 'player-history', component: PlayerRecordsComponent },
  { path: '', redirectTo: '/standings', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
