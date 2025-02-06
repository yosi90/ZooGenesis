import { Component, ElementRef, QueryList, Renderer2, ViewChildren, AfterViewInit } from '@angular/core';
import { Card } from './interfaces/card';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RulesComponent } from './components/rules/rules.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, MatTooltipModule, MatDialogModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
})
export class AppComponent implements AfterViewInit {
    title = 'Zoogenesis';

    @ViewChildren('cardElement') cardElements!: QueryList<ElementRef>; // Referencias a las cartas

    constructor(private renderer: Renderer2, private dialog: MatDialog) { }

    cards: Card[] = [
        {
            name: 'Aprola',
            name_id: 'aprola',
            rarity: 'common',
            spaces: 1,
            attack_value: 10,
            synergies: ['Pequeño', 'Animal', 'Volador'],
            type: 'Monster',
            effects: {
                Actions: ['Si tu tablero tiene exactamente 10 cartas de aprola, hay un 1% de probabilidades de que esta carta aumente en 989 su valor de ataque al ser activada.'],
                Constants: [
                    'Esta carta no puede ser intercambiada.',
                    'La calidad de esta carta no puede aumentar.',
                    'Esta carta no puede ser elegida como recompensa.'
                ],
                Triggered: [],
                Global: []
            }
        },
        {
            name: 'Plor',
            name_id: 'plor',
            rarity: 'common',
            spaces: 1,
            attack_value: 0,
            synergies: ['Pequeño', 'Mineral'],
            type: 'Tool',
            effects: {
                Actions: [],
                Constants: ['Atrae un monstruo Inteligente y Pequeño de tu oponente. El plor se destruye y obtienes el control del monstruo por el resto de la ronda. '],
                Triggered: [],
                Global: []
            }
        },
        {
            name: 'Lirvatha',
            name_id: 'lirvatha',
            rarity: 'infrequent',
            spaces: 3,
            attack_value: 0,
            synergies: ['Colosal', 'aberración', 'Arbóreo'],
            type: 'Monster',
            effects: {
                Actions: ['Duplica el daño del monstruo a la derecha si es arbóreo.'],
                Constants: [],
                Triggered: ['Cuando se activa la acción de la Lirvatha, destruye al monstruo de tu oponente. No afecta a Monstruos con al menos una de las siguientes sinergias: Colosal, Ígneo.'],
                Global: []
            }
        },
        {
            name: 'Quivern cola de daga',
            name_id: 'quivern_daga',
            rarity: 'infrequent',
            spaces: 1,
            attack_value: 100,
            synergies: ['Pequeño', 'Dragonil', 'Ígneo'],
            type: 'Monster',
            effects: {
                Actions: [],
                Constants: [],
                Triggered: ['Cuando otro Monstruo Animal del oponente se activa, el quivern cola de daga le lanza su aliento de fuego.'],
                Global: []
            }
        }
    ];

    ngAfterViewInit() {
        this.cardElements.forEach(cardRef => {
            const card = cardRef.nativeElement;

            this.renderer.listen(card, 'mousemove', (e: MouseEvent) => this.apply3DEffect(card, e));
            this.renderer.listen(card, 'mouseleave', () => this.reset3DEffect(card));

            this.renderer.listen(card, 'mouseenter', () => this.showTooltip(card));
            this.renderer.listen(card, 'mouseleave', () => this.hideTooltip(card));
        });
    }

    // 📌 Efecto 3D al mover el ratón
    private apply3DEffect(card: HTMLElement, event: MouseEvent) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateX = (event.clientY - centerY) / 30;
        const rotateY = (event.clientX - centerX) / -30;
        const shadowX = rotateX * -10;
        const shadowY = rotateY * -10;

        this.renderer.setStyle(card, 'boxShadow', `
            0px 10px 15px rgb(14, 13, 13), 
            10px 0px 15px rgb(14, 13, 13), 
            0px -10px 15px rgb(46, 24, 24), 
            -10px 0px 15px rgb(46, 24, 24), 
            ${shadowY}px ${shadowX}px 20px rgba(0, 0, 0, .3)
        `);

        this.renderer.setStyle(card, 'transform', `
            scale(1.1) perspective(500px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
        `);
        this.renderer.setStyle(card, 'zIndex', '10');
    }

    // 📌 Resetear efecto 3D
    private reset3DEffect(card: HTMLElement) {
        this.renderer.setStyle(card, 'boxShadow', '2px 2px 5px rgba(0, 0, 0, 0.4), -2px -2px 5px rgba(0, 0, 0, 0.4)');
        this.renderer.setStyle(card, 'transform', `scale(1) perspective(0) rotateX(0deg) rotateY(0deg)`);
        this.renderer.setStyle(card, 'zIndex', '0');
    }

    // 📌 Mostrar tooltip
    private showTooltip(card: HTMLElement) {
        this.hideTooltip(card);

        const cardName = card.getAttribute('data-name');
        if (!cardName) return;

        const cardData = this.cards.find(c => c.name_id === cardName);
        if (!cardData) return;

        const dialog = document.createElement('div');
        dialog.classList.add('hover-dialog', 'hover-dialog-hidden', 'borde_fancy');

        let textoAcciones = cardData.effects.Actions.length === 0 ? '' : `
            <h2>Acción</h2>
            <div>${cardData.effects.Actions.map(a => `<p>${a}</p>`).join('')}</div>
        `;

        let textoConstantes = cardData.effects.Constants.length === 0 ? '' : `
            <h2>Efectos constantes</h2>
            <div>${cardData.effects.Constants.map(c => `<p>${c}</p>`).join('')}</div>
        `;

        let textoDesencadenadas = cardData.effects.Triggered.length === 0 ? '' : `
            <h2>Efectos desencadenados</h2>
            <div>${cardData.effects.Triggered.map(t => `<p>${t}</p>`).join('')}</div>
        `;

        let textoGlobales = cardData.effects.Global.length === 0 ? '' : `
            <h2>Efectos globales</h2>
            <div>${cardData.effects.Global.map(g => `<p>${g}</p>`).join('')}</div>
        `;

        let contentHtml = `
            <div class="rules_container">
                ${textoAcciones}
                ${textoConstantes}
                ${textoDesencadenadas}
                ${textoGlobales}
            </div>
        `;

        dialog.innerHTML = contentHtml;
        document.body.appendChild(dialog);

        const rect = card.getBoundingClientRect();
        const espacioDerecha = window.innerWidth - rect.right;

        if (espacioDerecha >= 250) {
            dialog.style.top = `${window.scrollY + rect.top + 50}px`;
            dialog.style.left = `${window.scrollX + rect.right + 20}px`;
        } else {
            dialog.style.top = `${window.scrollY + rect.top}px`;
            dialog.style.left = `${window.scrollX + rect.left - 250}px`;
        }

        requestAnimationFrame(() => dialog.classList.remove('hover-dialog-hidden'));

        (card as any)._hoverDialog = dialog;
    }


    private hideTooltip(card: HTMLElement) {
        const dialog = (card as any)._hoverDialog;
        if (dialog) {
            dialog.classList.add('hover-dialog-hidden');
            dialog.addEventListener('transitionend', () => {
                dialog.remove();
                (card as any)._hoverDialog = null;
            });
        }
    }

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
