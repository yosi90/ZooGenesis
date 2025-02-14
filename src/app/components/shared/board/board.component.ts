import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-board',
    imports: [CommonModule],
    templateUrl: './board.component.html',
    styleUrl: './board.component.sass',
    animations: [
        trigger('expandirTablero', [
            state('tiny', style({  })),
            state('small', style({  })),
            state('medium', style({  })),
            state('large', style({ })),
            state('full', style({  })),
            transition('* => *', [animate('0.5s ease-in-out')]),
        ]),
    ],
})
export class BoardComponent {
    espacios = 2;
    estadoTablero = 'tiny';

    expandirTablero() {
        if (this.espacios < 10) {
            this.espacios += 2;
            this.estadoTablero = this.obtenerEstado();
        } else {
            this.espacios = 2;
            this.estadoTablero = this.obtenerEstado();
        }
    }

    obtenerEstado(): string {
        switch (this.espacios) {
            case 2: return 'tiny';
            case 4: return 'small';
            case 6: return 'medium';
            case 8: return 'large';
            case 10: return 'full';
            default: return 'tiny';
        }
    }
}
