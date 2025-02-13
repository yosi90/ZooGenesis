import { Component } from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar.component';
import { MainRouterComponent } from './components/main-router/main-router.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [NavbarComponent, MainRouterComponent, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
})
export class AppComponent {
    title = 'Zoogenesis';
}