import { Component, ElementRef, ViewChild } from '@angular/core';
import { ColectionComponent } from '../shared/colection/colection.component';
import { BoardComponent } from '../shared/board/board.component';

@Component({
    selector: 'app-game',
    imports: [ColectionComponent, BoardComponent],
    templateUrl: './game.component.html',
    styleUrl: './game.component.sass'
})
export class GameComponent {
    @ViewChild('tableroPanel', { static: false }) tableroPanel!: ElementRef;
    @ViewChild('coleccionPanel', { static: false }) coleccionPanel!: ElementRef;

    ngAfterViewInit() {
        const separador = document.querySelector('.separador') as HTMLElement;
        let isResizing = false;

        separador.addEventListener('mousedown', (event) => {
            isResizing = true;
            document.addEventListener('mousemove', resizePanels);
            document.addEventListener('mouseup', () => {
                isResizing = false;
                document.removeEventListener('mousemove', resizePanels);
            });
        });

        const resizePanels = (event: MouseEvent) => {
            if (!isResizing) return;
            const contenedor = document.querySelector('.contenedor') as HTMLElement;
            const offsetTop = contenedor.getBoundingClientRect().top;
            const newHeight = event.clientY - offsetTop;

            this.tableroPanel.nativeElement.style.flex = `0 0 ${newHeight}px`;
            this.coleccionPanel.nativeElement.style.flex = `1`;
        };
    }
}
