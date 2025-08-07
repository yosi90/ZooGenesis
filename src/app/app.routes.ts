import { Routes } from '@angular/router';
import { ColectionComponent } from './components/shared/colection/colection.component';
import { GameComponent } from './components/game/game.component';
import { PruebasDragDropComponent } from './components/pruebas-drag-drop/pruebas-drag-drop.component';

export const routes: Routes = [
    { path: '', redirectTo: 'colection', pathMatch: 'full' },
    { path: 'colection', component: ColectionComponent },
    { path: 'game', component: GameComponent },
    { path: 'pruebas', component: PruebasDragDropComponent },
    { path: '**', component: ColectionComponent }
];
