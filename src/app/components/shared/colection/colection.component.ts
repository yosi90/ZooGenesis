import { Component, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Card } from '../../../interfaces/card';
import { CardListService } from '../../../services/card-list.service';
import { CardComponent } from '../card/card.component';
import { LeyendComponent } from '../leyend/leyend.component';

@Component({
    selector: 'app-colection',
    imports: [CardComponent, LeyendComponent],
    templateUrl: './colection.component.html',
    styleUrl: './colection.component.sass'
})
export class ColectionComponent {

    @ViewChildren(CardComponent) cardComps!: QueryList<CardComponent>; // Referencias a las cartas

    cards!: Card[];

    constructor(private CSrv: CardListService, private renderer: Renderer2) {
        this.cards = CSrv.cards;
    }
}
