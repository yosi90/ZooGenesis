import { Routes } from '@angular/router';
import { ColectionComponent } from './components/shared/colection/colection.component';
import { GameComponent } from './components/game/game.component';

export const routes: Routes = [
    { path: '', redirectTo: 'colection', pathMatch: 'full' },
    { path: 'colection', component: ColectionComponent },
    { path: 'game', component: GameComponent },
    { path: '**', component: ColectionComponent }
];
