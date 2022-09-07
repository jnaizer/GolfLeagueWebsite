import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameHistoryComponent } from './components/game-history/game-history.component';
import { PlayerRecordsComponent } from './components/player-records/player-records.component';
import { RecordGameComponent } from './components/record-game/record-game.component';
import { StandingsComponent } from './components/standings/standings.component';

const routes: Routes = [
  { path: 'standings', component: StandingsComponent },
  { path: 'game-history', component: GameHistoryComponent },
  { path: 'player-history', component: PlayerRecordsComponent },
  { path: 'record-game', component: RecordGameComponent },
  { path: '', redirectTo: '/standings', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
