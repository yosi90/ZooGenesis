import { Component, Input, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Card } from '../../../interfaces/card';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule, MatTooltipModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.sass'
})
export class CardComponent implements AfterViewInit {
    @Input() card!: Card;
    @ViewChild('cardElement', { static: true }) cardElement!: ElementRef;

    private tooltipTimeout: any = null; // Guardamos el timeout para cancelarlo

    constructor(private renderer: Renderer2) { }

    ngAfterViewInit() {
        const card = this.cardElement.nativeElement;

        this.renderer.listen(card, 'mousemove', (e: MouseEvent) => this.apply3DEffect(card, e));
        this.renderer.listen(card, 'mouseleave', () => this.reset3DEffect(card));

        this.renderer.listen(card, 'mouseenter', () => this.showTooltip(card));
        this.renderer.listen(card, 'mouseleave', () => this.hideTooltip(card));
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
            0px -10px 15px rgb(14, 13, 13), 
            -10px 0px 15px rgb(14, 13, 13), 
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
        this.hideTooltip(card); // 📌 Asegura que no haya tooltips previos

        // 📌 Si había un timeout anterior, lo cancelamos antes de crear uno nuevo
        if (this.tooltipTimeout) {
            clearTimeout(this.tooltipTimeout);
        }

        this.tooltipTimeout = setTimeout(() => {
            // 📌 Desplaza la carta al centro antes de mostrar el tooltip
            card.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center"
            });

            const dialog = document.createElement('div');
            dialog.classList.add('hover-dialog', 'hover-dialog-hidden', 'borde_fancy');

            let textoAcciones = this.card.effects.Actions.length === 0 ? '' : `
            <div class="accion"><p class="title">Acción</p>
            ${this.card.effects.Actions.map(a => `
                <img src="/icons/accion.png">
                <p class="list">${a.Value}${a.disclaimer ? `<br><span class="disclaimer">** ${a.disclaimer}</span>` : ''}</p>                 
            `).join('')}
            </div>
        `;

            let textoConstantes = this.card.effects.Constants.length === 0 ? '' : `
            <div class="constante"><p class="title">Efectos constantes</p>
            ${this.card.effects.Constants.map(c => `
                <img src="/icons/constante.png">
                <p class="list">${c.Value}${c.disclaimer ? `<br><span class="disclaimer">** ${c.disclaimer}</span>` : ''}</p>                 
            `).join('')}
            </div>
        `;

            let textoDesencadenadas = this.card.effects.Triggered.length === 0 ? '' : `
            <div class="desencadenado"><p class="title">Efectos desencadenados</p>
            ${this.card.effects.Triggered.map(t => `
                <img src="/icons/desencadenado.png">
                <p class="list">${t.Value}${t.disclaimer ? `<br><span class="disclaimer">** ${t.disclaimer}</span>` : ''}</p>  
            `).join('')}
            </div>
        `;

            let textoGlobales = this.card.effects.Global.length === 0 ? '' : `
            <div class="global"><p class="title">Efectos globales</p>
            ${this.card.effects.Global.map(g => `
                <img src="/icons/global.png">
                <p class="list">${g.Value}${g.disclaimer ? `<br><span class="disclaimer">** ${g.disclaimer}</span>` : ''}</p>
            `).join('')}
            </div>
        `;

            let textoAumentos = this.card.augments.length === 0 ? '' : `
            <div class="augments_container">
                <div class="augments"><p class="title">Avances en calidad</p>
                ${this.card.augments.map(g => `
                    <img src='/icons/${g.quality}_icon.png'>
                    <p class="list">${g.effect}</p>
                `).join('')}
                </div>
            </div>
        `;

            let contentHtml = `
            <h1 class='${this.card.base_quality} col_span_2'>${this.card.name}</h1>
            <div class="rules_container ${this.card.augments.length > 0 ? '' : 'col_span_2'}">
                ${textoAcciones}
                ${textoDesencadenadas}
                ${textoConstantes}
                ${textoGlobales}
                ${textoAcciones === '' && textoDesencadenadas === '' && textoConstantes === '' && textoGlobales === '' ? '<div><p><img src="/icons/prohibido.png">No tiene efectos</p></div>' : ''}
            </div>
            ${textoAumentos}
        `;

            dialog.innerHTML = contentHtml;
            document.body.appendChild(dialog);

            const rect = card.getBoundingClientRect();
            const espacioDerecha = window.innerWidth - rect.right;

            if (espacioDerecha >= 650) {
                dialog.style.top = `${window.scrollY + rect.top + 50}px`;
                dialog.style.left = `${window.scrollX + rect.right + 20}px`;
            } else {
                dialog.style.top = `${window.scrollY + rect.top + 50}px`;
                dialog.style.left = `${window.scrollX + rect.left - 620}px`;
            }

            requestAnimationFrame(() => dialog.classList.remove('hover-dialog-hidden'));

            (card as any)._hoverDialog = dialog;
        }, 250);
    }

    private hideTooltip(card: HTMLElement) {
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

    getAttackIcon(card: Card): string {
        const basePath = '/icons/';
        return card.synergies.includes('Inteligente') ? `${basePath}ataque_inteligente.png` : `${basePath}ataque_estupido.png`;
    }

    getTypeIcon(card: Card): string {
        const basePath = '/icons/';
        return `${basePath}${card.type.toLowerCase()}.png`;
    }

    getTypeName(card: Card): string {
        if (!card.type.includes('_'))
            return card.type.replace('_', ' ');
        else {
            if (card.type === 'Monstruo_fusion')
                return 'Monstruo fusión'
            if (card.type === 'Monstruo_transformacion')
                return 'Monstruo transformación'
            if (card.type === 'Monstruo_invocacion')
                return 'Monstruo invocación'
        }
        return 'Error';
    }

    getSynergyIcon(synergie: string): string {
        const basePath = '/icons/';
        if (synergie === 'Pequeño')
            return `${basePath}${synergie.toLowerCase()}.png`;
        return `${basePath}${synergie.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}.png`;
    }
}
