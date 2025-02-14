import { Component, Input, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Card } from '../../../interfaces/card';
import { CardListService } from '../../../services/card-list.service';
import { CardComponent } from '../card/card.component';
import { LeyendComponent } from '../leyend/leyend.component';
import { MatInputModule } from '@angular/material/input';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-colection',
    imports: [MatInputModule, CardComponent, LeyendComponent, NgxSliderModule, DragDropModule],
    templateUrl: './colection.component.html',
    styleUrl: './colection.component.sass'
})
export class ColectionComponent {
    @Input() drag: boolean = false;
    
    @ViewChildren(CardComponent) cardComps!: QueryList<CardComponent>; // Referencias a las cartas

    cards!: Card[];
    cardSize: number = 460;
    borderSize: number = this.getBorderSize(this.cardSize);

    sliderOptions: Options = {
        floor: 180,
        ceil: 460,
        step: 40,
        showTicks: true,
        vertical: true,
        showSelectionBar: true,
        hideLimitLabels: true
    };

    constructor(private CSrv: CardListService, private renderer: Renderer2) {
        this.cards = CSrv.cards;
    }
    
    elevarZIndex(event: any) {
        this.renderer.setStyle(event.source.element.nativeElement, 'z-index', '1000');
    }

    resetearCarta(event: any) {
        const carta = event.source.element.nativeElement;
        this.renderer.setStyle(carta, 'transform', 'translate3d(0, 0, 0)');
        this.renderer.setStyle(carta, 'z-index', '1');
        event.source.reset();
    }

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

    actualizarTamano(size: number) {
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

    setMaxHeight() {
        if (this.cardSize === 460)
            return;
        this.cardSize = 460;
        this.actualizarTamano(460);
    }

    setMinHeight() {
        if (this.cardSize === 180)
            return;
        this.cardSize = 180;
        this.actualizarTamano(180);
    }
}
