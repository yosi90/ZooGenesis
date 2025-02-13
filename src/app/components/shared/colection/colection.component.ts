import { Component, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Card } from '../../../interfaces/card';
import { CardListService } from '../../../services/card-list.service';
import { CardComponent } from '../card/card.component';
import { LeyendComponent } from '../leyend/leyend.component';
import { MatInputModule } from '@angular/material/input';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

@Component({
    selector: 'app-colection',
    imports: [MatInputModule, CardComponent, LeyendComponent, NgxSliderModule],
    templateUrl: './colection.component.html',
    styleUrl: './colection.component.sass'
})
export class ColectionComponent {

    @ViewChildren(CardComponent) cardComps!: QueryList<CardComponent>; // Referencias a las cartas

    cards!: Card[];
    cardSize: number = 460;

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

    actualizarTamano() {
        this.cardComps.forEach(cardComp => {
            if (cardComp.cardElement) {
                this.renderer.setStyle(cardComp.cardElement.nativeElement, 'height', `${this.cardSize}px`);
            }
        });
    }
}
