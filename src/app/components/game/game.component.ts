import { Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { CardComponent } from '../shared/card/card.component';
import { Card } from '../../interfaces/card';
import { CardListService } from '../../services/card-list.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-game',
    imports: [CommonModule, CardComponent, DragDropModule, NgxSliderModule],
    templateUrl: './game.component.html',
    styleUrl: './game.component.sass'
})
export class GameComponent {
    @ViewChild('tableroPanel', { static: false }) tableroPanel!: ElementRef;
    @ViewChild('coleccionPanel', { static: false, read: CdkDropList }) coleccionPanel!: CdkDropList;
    @ViewChild('zonaCancelacionIzquierda', { static: false, read: CdkDropList }) zonaCancelacionIzquierda!: CdkDropList;
    @ViewChild('zonaCancelacionDerecha', { static: false, read: CdkDropList }) zonaCancelacionDerecha!: CdkDropList;
    @ViewChildren(CardComponent) cardComps!: QueryList<CardComponent>;

    cards!: Card[];
    tablero: Card[] = [];
    ronda: number = 1;
    cartasEnTablero: Card[] = [];
    // tablero = Array(2).fill(null);

    cardSize: number = 460;
    borderSize: number = this.getBorderSize(this.cardSize);
    mostrarZonasCancelacion: boolean = false;

    constructor(private CSrv: CardListService, private renderer: Renderer2) {
        this.cards = CSrv.cards;
    }

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
        };
        this.setCardMinHeight();
    }

    //Código de la colección

    sliderOptions: Options = {
        floor: 180,
        ceil: 460,
        step: 40,
        showTicks: true,
        vertical: true,
        showSelectionBar: true,
        hideLimitLabels: true
    };

    getBorderSize(size: number): number {
        switch (size) {
            case 460: return 22;
            case 420: return 21;
            case 380: return 21;
            case 340: return 20;
            case 300: return 20;
            case 260: return 0;
            case 220: return 0;
            case 180: return 0;
            default: return 22;
        }
    }

    actualizarTamanoCartas(size: number) {
        this.cardSize = size;
        this.borderSize = this.getBorderSize(size);
        this.cardComps.forEach(cardComp => {
            if (cardComp.cardElement) {
                this.renderer.setStyle(cardComp.cardElement.nativeElement, 'height', `${this.cardSize}px`);
            }
            ['border1', 'border2', 'border3', 'border4'].forEach(borderClass => {
                const borderElement = cardComp.cardElement.nativeElement.parentElement.querySelector(`.${borderClass}`);
                if (borderElement && this.borderSize !== 0) {
                    this.renderer.setStyle(borderElement, 'display', `block`);
                    this.renderer.setStyle(borderElement, 'width', `${this.borderSize}px`);
                    this.renderer.setStyle(borderElement, 'height', `${this.borderSize}px`);
                } else if (borderElement)
                    this.renderer.setStyle(borderElement, 'display', `none`);
            });
            ['attack_value', 'shield_value', 'heal_value', 'type'].forEach(iconContainerClass => {
                const element = cardComp.cardElement.nativeElement.parentElement.querySelector(`.${iconContainerClass}`);
                if (element && this.cardSize > 340) {
                    this.renderer.setStyle(element, 'display', `flex`);
                } else if (element)
                    this.renderer.setStyle(element, 'display', `none`);
            });
            ['synergies', 'card-title'].forEach(iconContainerClass => {
                const element = cardComp.cardElement.nativeElement.parentElement.querySelector(`.${iconContainerClass}`);
                if (element && this.cardSize > 340) {
                    this.renderer.setStyle(element, 'display', `block`);
                } else if (element)
                    this.renderer.setStyle(element, 'display', `none`);
            });
        });
    }

    setCardMaxHeight() {
        if (this.cardSize === 460)
            return;
        this.cardSize = 460;
        this.actualizarTamanoCartas(460);
    }

    setCardMinHeight() {
        if (this.cardSize === 180)
            return;
        this.cardSize = 180;
        this.actualizarTamanoCartas(180);
    }

    //Código del tablero

    expandirTablero() {
        if (this.tablero.length < 10) {
            for(let i = 0; i < this.ronda * 2; i++)
                this.tablero.push(null as any);
        } else {
            this.tablero = Array(2).fill(null as any);
        }
    }

    drop(event: CdkDragDrop<Card[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            this.cartasEnTablero.push(event.item.data)
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }

    espacePredicate(item: CdkDrag<Card>) {
        console.log(this.cartasEnTablero.reduce((total, carta) => total + carta.spaces, 0), item.data.spaces, this.ronda * 2);
        return this.cartasEnTablero.reduce((total, carta) => total + carta.spaces, 0) + item.data.spaces <= this.ronda * 2;
    }
}
