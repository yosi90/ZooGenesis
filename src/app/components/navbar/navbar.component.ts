import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RulesComponent } from '../rules/rules.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.sass'
})
export class NavbarComponent {

    constructor(private dialog: MatDialog) { }

    openDialog() {
        this.dialog.open(RulesComponent, {
            width: '80%',
            height: '80vh',
            maxWidth: 'none',
            hasBackdrop: true,
            data: { message: "Este es el diálogo que abriste con el favicon" }
        });
    }
}
