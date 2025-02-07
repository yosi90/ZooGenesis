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
                Actions: ['Si tu tablero tiene exactamente 10 cartas de aprola, hay un 1% de probabilidades de que esta carta aumente en 989 su <img src="/icons/ataque_estupido.png" alt="Ícono de ataque"> al ser activada.'],
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
                Constants: ['Atrae un monstruo Inteligente y <img src="/icons/pequeño.png" alt="Ícono de Pequeño"> de tu oponente. El plor se destruye y obtienes el control del monstruo por el resto de la ronda. '],
                Triggered: [],
                Global: []
            }
        },
        {
            name: 'Nimroot',
            name_id: 'nimroot',
            rarity: 'infrequent',
            spaces: 1,
            attack_value: 0,
            synergies: ['Pequeño', 'Animal', 'Subterráneo'],
            type: 'Monster',
            effects: {
                Actions: ['Asalta al monstruo activo del oponente y lo envenena impidiendo que actúe este turno e impidiendo que sus efectos se activen por la duración del veneno.'],
                Constants: ['Si un efecto de tu oponente le hace objetivo, el Nimroot se oculta bajo tierra y reaparece al final de la etapa en una posición aleatoria del tablero, cuya etapa aún no haya pasado.'],
                Triggered: [],
                Global: []
            }
        },
        {
            name: 'Nÿlmaekrûl',
            name_id: 'nylmaekrul',
            rarity: 'infrequent',
            spaces: 2,
            attack_value: 50,
            synergies: ['Grande', 'Acutático'],
            type: 'Monster',
            effects: {
                Actions: [],
                Constants: ['El Nÿlmaekrûl obtiene 50 <img src="/icons/ataque_estupido.png" alt="Ícono de ataque"> por cada monstruo acuático en tu tablero.'],
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
            synergies: ['Colosal', 'Aberración', 'Arbóreo'],
            type: 'Monster',
            effects: {
                Actions: ['Duplica el <img src="/icons/ataque_estupido.png" alt="Ícono de ataque"> del monstruo a la derecha si es arbóreo.'],
                Constants: [],
                Triggered: ['Cuando se activa la acción de la Lirvatha, destruye al monstruo de tu oponente. No afecta a Monstruos con al menos una de las siguientes sinergias: Colosal, Ígneo.'],
                Global: []
            }
        },
        {
            name: 'Quivern cola daga',
            name_id: 'quivern_daga',
            rarity: 'infrequent',
            spaces: 1,
            attack_value: 100,
            synergies: ['Pequeño', 'Dragonil', 'Ígneo'],
            type: 'Monster',
            effects: {
                Actions: [],
                Constants: [],
                Triggered: ['Cuando otro Monstruo Animal del oponente se activa, el quivern cola de daga le lanza su aliento de <img src="/icons/igneo.png" alt="Ícono de sinergia Ígneo">.'],
                Global: []
            }
        },
        {
            name: 'Quivern cola púas',
            name_id: 'quivern_puas',
            rarity: 'infrequent',
            spaces: 1,
            attack_value: 100,
            synergies: ['Pequeño', 'Dragonil', 'Gélido'],
            type: 'Monster',
            effects: {
                Actions: [],
                Constants: [],
                Triggered: ['Cuando otro Monstruo Animal del oponente se activa, el quivern cola de daga le lanza su aliento de <img src="/icons/gelido.png" alt="Ícono de sinergia Gélido">.'],
                Global: []
            }
        },
        {
            name: 'Quivern cola martillo',
            name_id: 'quivern_martillo',
            rarity: 'infrequent',
            spaces: 1,
            attack_value: 100,
            synergies: ['Pequeño', 'Dragonil', 'Corrosivo'],
            type: 'Monster',
            effects: {
                Actions: [],
                Constants: [],
                Triggered: ['Cuando otro Monstruo Animal del oponente se activa, el quivern cola de daga le lanza su aliento de <img src="/icons/corrosivo.png" alt="Ícono de sinergia Corrosivo">.'],
                Global: []
            }
        },
        {
            name: 'Bosque de aylánidos',
            name_id: 'aylanido',
            rarity: 'rare',
            spaces: 3,
            attack_value: 0,
            synergies: ['Colosal', 'Acuático', 'Arbóreo', 'Humanoide', 'Inteligente'],
            type: 'Monster',
            effects: {
                Actions: ['Asalta al monstruo activo del oponente y lo convierte en Aylánido.'],
                Constants: ['Si el efecto de una carta le hace objetivo, contrarresta dicho efecto y transforma la carta en un Aylánido.'],
                Triggered: [
                    'El Bosque de aylánidos obtiene 50 <img src="/icons/ataque_estupido.png" alt="Ícono de ataque"> por cada Aylánido en juego.',
                    'El bosque de aylánidos cuenta como tres cartas de Aylánido a la hora del recuento de Aylánidos en juego.'
                ],
                Global: []
            }
        },
        {
            name: 'Obsidian',
            name_id: 'obsidian',
            rarity: 'rare',
            spaces: 2,
            attack_value: 0,
            synergies: ['Grande', 'Forjado', 'Humanoide', 'Ígneo'],
            type: 'Monster',
            effects: {
                Actions: ['Si hay espacio en tu tablero, lo llena con Obsidians jóvenes. Si no, Erupciona de ira y reduce a la mitad el valor de ataque de todos los monstruos de tu oponente.'],
                Constants: [],
                Triggered: [
                    'Cuando un Obsidian joven entra al tablero, el Obsidian te otorga 50 <img src="/icons/escudo.png" alt="Ícono de ataque">.',
                    'Cuando un Obsidian joven abandona el tablero, el Obsidian hace daño igual a tus <img src="/icons/escudo.png" alt="Ícono de ataque"> a tu oponente.'
                ],
                Global: []
            }
        },
        {
            name: 'Dragón negro',
            name_id: 'dragon_negro',
            rarity: 'rare',
            spaces: 2,
            attack_value: 200,
            synergies: ['Grande', 'Dragonil', 'Inteligente', 'Ígneo', 'Volador'],
            type: 'Monster',
            effects: {
                Actions: ['Asalta al monstruo activo de tu oponente con su Aliento de fuego'],
                Constants: [],
                Triggered: [
                    'Tras activarse una herramienta Mineral, la destruye.'
                ],
                Global: []
            }
        },
        {
            name: 'Dragón verde',
            name_id: 'dragon_verde',
            rarity: 'rare',
            spaces: 3,
            attack_value: 0,
            synergies: ['Colosal', 'Dragonil', 'Inteligente', 'Volador'],
            type: 'Monster',
            effects: {
                Actions: ['Se come todos los monstruos pequeños con Prontitud menor.'],
                Constants: [],
                Triggered: [
                    'Si un efecto de tu oponente le hace objetivo, obtiene 50 <img src="/icons/ataque_estupido.png" alt="Ícono de ataque">.',
                    'Si el Dragón verde ya atacó y un efecto del oponente le hace objetivo, el dragón hace una cantidad de daño igual a su valor de ataque al oponente.'
                ],
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

    private tooltipTimeout: any = null; // 📌 Guardamos el timeout para cancelarlo si es necesario

    // 📌 Mostrar tooltip
    private showTooltip(card: HTMLElement) {
        this.hideTooltip(card); // 📌 Asegura que no haya tooltips previos

        // 📌 Si había un timeout anterior, lo cancelamos antes de crear uno nuevo
        if (this.tooltipTimeout) {
            clearTimeout(this.tooltipTimeout);
        }

        // 📌 Iniciamos un timeout de 100 ms antes de crear el tooltip
        this.tooltipTimeout = setTimeout(() => {
            const cardName = card.getAttribute('data-name');
            if (!cardName) return;

            const cardData = this.cards.find(c => c.name_id === cardName);
            if (!cardData) return;

            // 📌 Desplaza la carta al centro antes de mostrar el tooltip
            card.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center"
            });

            const dialog = document.createElement('div');
            dialog.classList.add('hover-dialog', 'hover-dialog-hidden', 'borde_fancy');

            let textoAcciones = cardData.effects.Actions.length === 0 ? '' : `
                <div class="accion"><p class="title">Acción</p>${cardData.effects.Actions.map(a => `<img src="/icons/accion.png"><p class="list">${a}</p>`).join('')}</div>
            `;

            let textoConstantes = cardData.effects.Constants.length === 0 ? '' : `
                <div class="constante"><p class="title">Efectos constantes</p>${cardData.effects.Constants.map(c => `<img src="/icons/constante.png"><p class="list">${c}</p>`).join('')}</div>
            `;

            let textoDesencadenadas = cardData.effects.Triggered.length === 0 ? '' : `
                <div class="desencadenado"><p class="title">Efectos desencadenados</p>${cardData.effects.Triggered.map(t => `<img src="/icons/desencadenado.png"><p class="list">${t}</p>`).join('')}</div>
            `;

            let textoGlobales = cardData.effects.Global.length === 0 ? '' : `
                <div class="global"><p class="title">Efectos globales</p>${cardData.effects.Global.map(g => `<img src="/icons/global.png"><p class="list">${g}</p>`).join('')}</div>
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

            if (espacioDerecha >= 350) {
                dialog.style.top = `${window.scrollY + rect.top + 50}px`;
                dialog.style.left = `${window.scrollX + rect.right + 20}px`;
            } else {
                dialog.style.top = `${window.scrollY + rect.top + 50}px`;
                dialog.style.left = `${window.scrollX + rect.left - 350}px`;
            }

            requestAnimationFrame(() => dialog.classList.remove('hover-dialog-hidden'));

            (card as any)._hoverDialog = dialog;
        }, 250); // 📌 Esperamos 250ms antes de crear el tooltip
    }


    private hideTooltip(card: HTMLElement) {
        // 📌 Si hay un timeout en curso, lo cancelamos
        if (this.tooltipTimeout) {
            clearTimeout(this.tooltipTimeout);
            this.tooltipTimeout = null;
        }

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

    getAttackIcon(card: Card): string {
        const basePath = '/icons/ataque_';
        return card.synergies.includes('Inteligente') ? `${basePath}inteligente.png` : `${basePath}estupido.png`;
    }
}
