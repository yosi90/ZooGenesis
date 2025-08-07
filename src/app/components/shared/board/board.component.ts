import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDropList, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-board',
    imports: [CommonModule, DragDropModule],
    templateUrl: './board.component.html',
    styleUrl: './board.component.sass',
    animations: [
        trigger('expandirTablero', [
            state('tiny', style({})),
            state('small', style({})),
            state('medium', style({})),
            state('large', style({})),
            state('full', style({})),
            transition('* => *', [animate('0.5s ease-in-out')]),
        ]),
    ],
})
export class BoardComponent {
    @Input() coleccion: string[] = [];
    @Input() tablero: (string | null)[] = [];
    @Output() moverCarta = new EventEmitter<CdkDragDrop<string[]>>();
    @Output() expandir = new EventEmitter<void>();

    @ViewChild('cancelIzquierda') cancelIzquierda!: CdkDropList;
    @ViewChild('cancelDerecha') cancelDerecha!: CdkDropList;

    estadoTablero = 'tiny';

    mostrarZonasCancelacion: boolean = false;

    constructor() { }

    expandirTablero() {
        this.expandir.emit();
    }

    moverCartaTablero(event: CdkDragDrop<any>) { 
        this.moverCarta.emit(event as CdkDragDrop<string[]>);
        this.mostrarZonasCancelacion = false;
    }

    cancelarCarta(event: CdkDragDrop<string[]>) {
        transferArrayItem(
            event.previousContainer.data,
            this.coleccion,
            event.previousIndex,
            this.coleccion.length
        );
        this.mostrarZonasCancelacion = false;
    }

    activarZonasCancelacion() {
        this.mostrarZonasCancelacion = true;
    }
    
    desactivarZonasCancelacion() {
        setTimeout(() => {
            this.mostrarZonasCancelacion = false;
        }, 200);
    }    
}
