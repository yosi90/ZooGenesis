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
            rarity: 'comun',
            base_quality: 'bronce',
            max_quality: 'bronce',
            spaces: 1,
            attack_value: 10,
            synergies: ['Pequeño', 'Animal', 'Estúpido', 'Volador'],
            type: 'Monstruo',
            effects: {
                Actions: [{ Value: 'Si tu tablero tiene exactamente 10 cartas de aprola, hay un 1% de probabilidades de que esta carta aumente en 989 su <img src="/icons/ataque_estupido.png">.', disclaimer: '' }],
                Constants: [
                    { Value: 'Esta carta no puede ser intercambiada.', disclaimer: '' },
                    { Value: 'La calidad de esta carta no puede aumentar.', disclaimer: '' },
                    { Value: 'Esta carta no puede ser elegida como recompensa.', disclaimer: '' }
                ],
                Triggered: [],
                Global: []
            },
            augments: []
        },
        {
            name: "Campo de hortalizas",
            name_id: "campo_de_hortalizas",
            rarity: "comun",
            base_quality: "bronce",
            max_quality: "diamante",
            spaces: 3,
            attack_value: 10,
            synergies: ["Colosal", "Estúpido", "Vegetal"],
            type: "Alimento",
            effects: {
                Actions: [],
                Constants: [
                    { Value: "Cuando el Campo de hortalizas sea objetivo del efecto de un <img src='/icons/monstruo.png'> <img src='/icons/igneo.png'> o <img src='/icons/animal.png'>, destrúyelo.", disclaimer: '' }
                ],
                Triggered: [
                    { Value: "Cada vez que se active un efecto, el Campo de hortalizas te cura.", disclaimer: '' }
                ],
                Global: []
            },
            augments: [
                { quality: "plata", effect: "Duplica el valor de <img src='/icons/curacion.png'> del campo de hortalizas." },
                { quality: "oro", effect: "Duplica el valor de <img src='/icons/curacion.png'> del campo de hortalizas." },
                { quality: "diamante", effect: "Duplica el valor de <img src='/icons/curacion.png'> del campo de hortalizas." }
            ]
        },
        {
            name: "Plor",
            name_id: "plor",
            rarity: "comun",
            base_quality: "bronce",
            max_quality: "bronce",
            spaces: 1,
            attack_value: 0,
            synergies: ["Pequeño", "Mineral", "Moneda"],
            type: "Herramienta",
            effects: {
                Actions: [
                    { Value: "Atrae hasta un <img src='/icons/monstruo.png'> <img src='/icons/inteligente.png'> o <img src='/icons/subterraneo.png'>, que sea <img src='/icons/pequeño.png'> de tu oponente. El Plor se destruye y obtienes el control del <img src='/icons/monstruo.png'> por el resto de la ronda.", disclaimer: '' }
                ],
                Constants: [],
                Triggered: [],
                Global: []
            },
            augments: []
        },
        {
            name: "Quim",
            name_id: "quim",
            rarity: "infrecuente",
            base_quality: "bronce",
            max_quality: "bronce",
            spaces: 1,
            attack_value: 20, // Valor de escudo
            synergies: ["Pequeño", "Mineral", "Moneda"],
            type: "Herramienta",
            effects: {
                Actions: [
                    { Value: "Atrae hasta un <img src='/icons/monstruo.png'> <img src='/icons/inteligente.png'> o <img src='/icons/subterraneo.png'>, <img src='/icons/pequeño.png'> o <img src='/icons/grande.png'> de tu oponente. El Quim se destruye y obtienes el control del <img src='/icons/monstruo.png'> por el resto de la ronda.", disclaimer: '' }
                ],
                Constants: [],
                Triggered: [],
                Global: []
            },
            augments: []
        },
        {
            name: "Sello",
            name_id: "sello",
            rarity: "rara",
            base_quality: "bronce",
            max_quality: "bronce",
            spaces: 1,
            attack_value: 100,
            synergies: ["Pequeño", "Mineral", "Moneda"],
            type: "Herramienta",
            effects: {
                Actions: [
                    { Value: "Atrae hasta un <img src='/icons/monstruo.png'> Inteligente o Subterráneo, Pequeño o Grande de tu oponente. El sello se destruye y obtienes el control del <img src='/icons/monstruo.png'> por el resto de la ronda.", disclaimer: '' }
                ],
                Constants: [
                    { Value: "Mientras controles el sello puedes romper las reglas del juego y elegir tú mismo los objetivos de los <img src='/icons/desencadenado.png'> por <img src='/icons/monstruo.png'> <img src='/icons/inteligente.png'>.", disclaimer: 'Debes respetar los límites impuestos por cada carta a la hora de elegir objetivos.' }
                ],
                Triggered: [],
                Global: []
            },
            augments: []
        },
        {
            name: "Cofre del tesoro",
            name_id: "cofre_del_tesoro",
            rarity: "mitica",
            base_quality: "bronce",
            max_quality: "diamante",
            spaces: 2,
            attack_value: 200,
            synergies: ["Grande", "Mineral", "Moneda"],
            type: "Herramienta",
            effects: {
                Actions: [
                    { Value: "Aumenta en 50 el valor de <img src='/icons/escudo.png'> del cofre por cada <img src='/icons/moneda.png'> en los tableros.", disclaimer: '' }
                ],
                Constants: [
                    { Value: "Redirige al cofre del tesoro todos los efectos activados por <img src='/icons/monstruo.png'> Inteligentes.", disclaimer: '' }
                ],
                Triggered: [
                    { Value: "Tras haber sido objetivo de un efecto, añade una <img src='/icons/moneda.png'> aleatoria a la mesa del controlador del efecto.", disclaimer: '' }
                ],
                Global: []
            },
            augments: [
                { quality: "plata", effect: "Aumenta en 100 los puntos de <img src='/icons/escudo.png'> que el Cofre del tesoro obtiene por cada <img src='/icons/moneda.png'>." },
                { quality: "oro", effect: "Aumenta en 100 los puntos de <img src='/icons/escudo.png'> que el Cofre del tesoro obtiene por cada <img src='/icons/moneda.png'>." },
                { quality: "diamante", effect: "Aumenta en 100 los puntos de <img src='/icons/escudo.png'> que el Cofre del tesoro obtiene por cada <img src='/icons/moneda.png'>." }
            ]
        },
        {
            name: "Faisán asado con setas y queso",
            name_id: "faisan_asado_con_setas_y_queso",
            rarity: "legendaria",
            base_quality: "diamante",
            max_quality: "diamante",
            spaces: 2,
            attack_value: 1000,
            synergies: ["Grande", "Carne"],
            type: "Alimento",
            effects: {
                Actions: [
                    { Value: "Aumenta el <img src='/icons/ataque_estupido.png'> de todos tus <img src='/icons/monstruo.png'> en 200.", disclaimer: "" }
                ],
                Constants: [
                    { Value: "Todos tus <img src='/icons/monstruo.png'> obtienen el efecto constante de: 'Este <img src='/icons/monstruo.png'> no se ve afectado por cambios en los tableros de juego'", disclaimer: "" },
                    { Value: "Todos tus <img src='/icons/monstruo.png'> obtienen el efecto de acción de: 'Multiataque 2'", disclaimer: "" }
                ],
                Triggered: [
                    { Value: "Si un efecto de otra carta fuera a destruir al Faisán asado con setas y queso, el Faisán asado con setas y queso deja el tablero de juego y en su lugar entran dos guardias reales.", disclaimer: "" }
                ],
                Global: []
            },
            augments: []
        },
        {
            name: "Guardia real",
            name_id: "guardia_real",
            rarity: "mitica",
            base_quality: "diamante",
            max_quality: "diamante",
            spaces: 1,
            attack_value: 100,
            synergies: ["Grande", "Dragonil", "Humanoide", "Inteligente", "Mágico"],
            type: "Monstruo_invocacion",
            effects: {
                Actions: [
                    { Value: "Asalta la carta activa de tu oponente y la destruye.", disclaimer: "Antes de que active sus efectos." }
                ],
                Constants: [
                    { Value: "Mientras el guardia real tenga un <img src='/icons/arma.png'> adyacente, duplica su <img src='/icons/ataque_inteligente.png'>.", disclaimer: "" }
                ],
                Triggered: [
                    { Value: "Si un efecto de una carta del oponente fuera a destruir o hacer huir una de tus cartas, en su lugar el Guardia real y la carta activa se destruyen.", disclaimer: "" }
                ],
                Global: []
            },
            augments: []
        },
        {
            name: "Alabarda",
            name_id: "alabarda",
            rarity: "infrecuente",
            base_quality: "bronce",
            max_quality: "diamante",
            spaces: 1,
            attack_value: 0,
            synergies: ["Pequeño", "Arma", "Mineral"],
            type: "Herramienta",
            effects: {
                Actions: [
                    { Value: "Si tiene un <img src='/icons/monstruo.png'> <img src='/icons/inteligente.png'> adyacente se fusiona con él. El <img src='/icons/monstruo.png'> resultante de la fusión tiene los mismos efectos que el original, pero su valor de ataque se duplica.", disclaimer: "" }
                ],
                Constants: [
                    { Value: "Si un <img src='/icons/subterraneo.png'> de tu tablero destruye o se fusiona con esta carta, te curas el doble del valor de ataque del monstruo.", disclaimer: "Se calcula antes de que se destruya esta carta." }
                ],
                Triggered: [],
                Global: []
            },
            augments: [
                { quality: "plata", effect: "El veneno afecta por dos etapas." },
                { quality: "oro", effect: "El veneno afecta por tres etapas." },
                { quality: "diamante", effect: "El veneno afecta por cuatro etapas." }
            ]
        },
        {
            name: 'Nimroot',
            name_id: 'nimroot',
            rarity: 'infrecuente',
            base_quality: 'bronce',
            max_quality: 'diamante',
            spaces: 1,
            attack_value: 0,
            synergies: ['Pequeño', 'Animal', 'Estúpido', 'Subterráneo'],
            type: 'Monstruo',
            effects: {
                Actions: [{ Value: 'Asalta al <img src="/icons/monstruo.png"> activo del oponente y lo envenena impidiendo que actúe este turno e impidiendo que sus efectos se activen por la duración del veneno.', disclaimer: 'Si la carta activa no es un monstruo, se contrarresta.' }],
                Constants: [],
                Triggered: [{ Value: 'Cuando un efecto de tu oponente le hace objetivo, el Nimroot se oculta bajo tierra y reaparece al final de la etapa en una posición aleatoria del tablero, cuya etapa aún no haya pasado.', disclaimer: 'La reaparición puede ser en cualquier espacio. Si es necesario desplaza las demás cartas.' }],
                Global: []
            },
            augments: [
                { quality: "plata", effect: "El veneno afecta por dos etapas." },
                { quality: "oro", effect: "El veneno afecta por tres etapas." },
                { quality: "diamante", effect: "El veneno afecta por cuatro etapas." }
            ]
        },
        {
            name: 'Nÿlmaekrûl',
            name_id: 'nylmaekrul',
            rarity: 'infrecuente',
            base_quality: 'bronce',
            max_quality: 'diamante',
            spaces: 2,
            attack_value: 50,
            synergies: ['Grande', 'Acuático', 'Estúpido'],
            type: 'Monstruo',
            effects: {
                Actions: [],
                Constants: [{ Value: 'El Nÿlmaekrûl obtiene 50 <img src="/icons/ataque_estupido.png"> por cada <img src="/icons/monstruo.png"> <img src="/icons/acuatico.png"> en tu tablero.', disclaimer: '' }],
                Triggered: [],
                Global: []
            },
            augments: [
                { quality: "plata", effect: "Valor de <img src='/icons/ataque_estupido.png'> y puntos de <img src='/icons/ataque_estupido.png'> del efecto <img src='/icons/constante.png'> se ven duplicados." },
                { quality: "oro", effect: "Valor de <img src='/icons/ataque_estupido.png'> y puntos de <img src='/icons/ataque_estupido.png'> del efecto <img src='/icons/constante.png'> se ven duplicados." },
                { quality: "diamante", effect: "Valor de <img src='/icons/ataque_estupido.png'> y puntos de <img src='/icons/ataque_estupido.png'> del efecto <img src='/icons/constante.png'> se ven duplicados." }
            ]
        },
        {
            name: 'Lirvatha',
            name_id: 'lirvatha',
            rarity: 'infrecuente',
            base_quality: 'plata',
            max_quality: 'diamante',
            spaces: 3,
            attack_value: 0,
            synergies: ['Colosal', 'Aberración', 'Arbóreo', 'Estúpido'],
            type: 'Monstruo',
            effects: {
                Actions: [{ Value: 'Asalta al <img src="/icons/monstruo.png"> activo de tu oponente y lo destruye. No afecta a <img src="/icons/monstruo.png"> con al menos una de las siguientes sinergias: <img src="/icons/colosal.png", <img src="/icons/igneo.png".', disclaimer: '' }],
                Constants: [{ Value: 'Duplica el <img src="/icons/ataque_estupido.png" alt="Ícono de ataque"> del <img src="/icons/monstruo.png"> a la derecha si es <img src="/icons/arboreo.png">.', disclaimer: '' }],
                Triggered: [],
                Global: []
            },
            augments: [
                { quality: "oro", effect: "Triplica el <img src='/icons/ataque_estupido.png'> de los <img src='/icons/monstruo.png'> adyacentes si son <img src='/icons/arboreo.png'>." },
                { quality: "diamante", effect: "Cuadruplica el <img src='/icons/ataque_estupido.png'> de todos los <img src='/icons/monstruo.png'> <img src='/icons/arboreo.png'> de tu tablero." }
            ]
        },
        {
            name: 'Quivern cola daga',
            name_id: 'quivern_daga',
            rarity: 'infrecuente',
            base_quality: 'bronce',
            max_quality: 'diamante',
            spaces: 1,
            attack_value: 100,
            synergies: ['Pequeño', 'Dragonil', 'Estúpido', 'Ígneo', 'Volador'],
            type: 'Monstruo',
            effects: {
                Actions: [],
                Constants: [],
                Triggered: [{ Value: 'Cuando otro <img src="/icons/monstruo.png"> <img src="/icons/animal.png"> del oponente se activa, el quivern cola de daga le lanza su aliento de <img src="/icons/igneo.png" alt="Ícono de sinergia Ígneo">.', disclaimer: 'Aliento de fuego reduce a la mitad el valor de ataque de su objetivo.' }],
                Global: []
            },
            augments: [
                { quality: "plata", effect: "Valor de <img src='/icons/ataque_estupido.png'> +100." },
                { quality: "oro", effect: "Valor de <img src='/icons/ataque_estupido.png'> +100." },
                { quality: "diamante", effect: "<img src='/icons/constante.png'> – Al comienzo del juego, si también controlas un Quivern cola púas y un Quivern cola martillo y los tres están adyacentes, fusiónalos." }
            ]
        },
        {
            name: 'Quivern cola púas',
            name_id: 'quivern_puas',
            rarity: 'infrecuente',
            base_quality: 'bronce',
            max_quality: 'diamante',
            spaces: 1,
            attack_value: 100,
            synergies: ['Pequeño', 'Dragonil', 'Estúpido', 'Gélido', 'Volador'],
            type: 'Monstruo',
            effects: {
                Actions: [],
                Constants: [],
                Triggered: [{ Value: 'Cuando otro <img src="/icons/monstruo.png"> <img src="/icons/animal.png"> del oponente se activa, el quivern cola de daga le lanza su aliento de <img src="/icons/gelido.png" alt="Ícono de sinergia Gélido">.', disclaimer: 'Aliento de hielo deshabilita las habilidades constantes de su objetivo.' }],
                Global: []
            },
            augments: [
                { quality: "plata", effect: "Valor de <img src='/icons/ataque_estupido.png'> +100." },
                { quality: "oro", effect: "Valor de <img src='/icons/ataque_estupido.png'> +100." },
                { quality: "diamante", effect: "<img src='/icons/constante.png'> – Al comienzo del juego, si también controlas un Quivern cola daga y un Quivern cola martillo y los tres están adyacentes, fusiónalos." }
            ]
        },
        {
            name: 'Quivern cola martillo',
            name_id: 'quivern_martillo',
            rarity: 'infrecuente',
            base_quality: 'bronce',
            max_quality: 'diamante',
            spaces: 1,
            attack_value: 100,
            synergies: ['Pequeño', 'Dragonil', 'Estúpido', 'Corrosivo', 'Volador'],
            type: 'Monstruo',
            effects: {
                Actions: [],
                Constants: [],
                Triggered: [{ Value: 'Cuando otro <img src="/icons/monstruo.png"> <img src="/icons/animal.png"> del oponente se activa, el quivern cola de daga le lanza su aliento de <img src="/icons/corrosivo.png" alt="Ícono de sinergia Corrosivo">.', disclaimer: 'Aliento de ácido anula las habilidades desencadenadas de su objetivo.' }],
                Global: []
            },
            augments: [
                { quality: "plata", effect: "Valor de <img src='/icons/ataque_estupido.png'> +100." },
                { quality: "oro", effect: "Valor de <img src='/icons/ataque_estupido.png'> +100." },
                { quality: "diamante", effect: "<img src='/icons/constante.png'> – Al comienzo del juego, si también controlas un Quivern cola daga y un Quivern cola púas y los tres están adyacentes, fusiónalos." }
            ]
        },
        {
            name: "Manada de quiverns",
            name_id: "manada_de_quiverns",
            rarity: "rara",
            base_quality: "diamante",
            max_quality: "diamante",
            spaces: 3,
            attack_value: 300,
            synergies: ["Colosal", "Dragonil", "Estúpido", "Gelido","Igneo", "Corrosivo", "Volador"],
            type: "Monstruo_fusion",
            effects: {
                Actions: [],
                Constants: [
                    { Value: "Los <img src='/icons/monstruo.png'> de sinergia <img src='/icons/animal.png'>, huyen de la partida.", disclaimer: "" }
                ],
                Triggered: [
                    { Value: "Cada vez que un <img src='/icons/animal.png'> abandona el tablero, lanza un aliento aleatorio a un <img src='/icons/monstruo.png'> del oponente.", disclaimer: "" }
                ],
                Global: []
            },
            augments: []
        },
        {
            name: 'Dragón verde',
            name_id: 'dragon_verde',
            rarity: 'rara',
            base_quality: 'plata',
            max_quality: 'diamante',
            spaces: 3,
            attack_value: 0,
            synergies: ['Colosal', 'Dragonil', 'Inteligente', 'Volador'],
            type: 'Monstruo',
            effects: {
                Actions: [{ Value: 'Se come todos los <img src="/icons/monstruo.png"> <img src="/icons/pequeño.png"> con Prontitud menor.', disclaimer: '' }],
                Constants: [],
                Triggered: [
                    { Value: 'Si un efecto de tu oponente le hace objetivo, obtiene 50 <img src="/icons/ataque_inteligente.png">.', disclaimer: '' },
                    { Value: 'Si el Dragón verde ya atacó y un efecto del oponente le hace objetivo, el dragón hace una cantidad de daño igual a su <img src="/icons/ataque_inteligente.png"> al oponente.', disclaimer: '' }
                ],
                Global: []
            },
            augments: [
                { quality: "oro", effect: "Los valores de <img src='/icons/ataque_inteligente.png'> obtenidos por los efectos se ven duplicados." },
                { quality: "diamante", effect: "Los valores de <img src='/icons/ataque_inteligente.png'> obtenidos por los efectos se ven duplicados." }
            ]
        },
        {
            name: 'Dragón negro',
            name_id: 'dragon_negro',
            rarity: 'rara',
            base_quality: 'plata',
            max_quality: 'diamante',
            spaces: 2,
            attack_value: 200,
            synergies: ['Grande', 'Dragonil', 'Inteligente', 'Ígneo', 'Volador'],
            type: 'Monstruo',
            effects: {
                Actions: [{ Value: 'Asalta al <img src="/icons/monstruo.png"> activo de tu oponente con su Aliento de fuego', disclaimer: 'Si la carta activa no es un monstruo, se contrarresta.' }],
                Constants: [],
                Triggered: [
                    { Value: 'Tras activarse una <img src="/icons/herramienta.png"> <img src="/icons/mineral.png">, la destruye.', disclaimer: '' }
                ],
                Global: []
            },
            augments: [
                { quality: "oro", effect: "Su <img src='/icons/ataque_inteligente.png'> aumenta en 300 puntos." },
                { quality: "diamante", effect: "Ahora su efecto <img src='/icons/desencadenado.png'> ahora solo afecta a <img src='/icons/herramienta.png'> del oponente." }
            ]
        },
        {
            name: "Aylánido",
            name_id: "aylanido",
            rarity: "rara",
            base_quality: "bronce",
            max_quality: "diamante",
            spaces: 1,
            attack_value: 0,
            synergies: ["Pequeño", "Acuatico", "Arboreo", "Humanoide", "Inteligente"],
            type: "Monstruo",
            effects: {
                Actions: [],
                Constants: [
                    { Value: "El Aylánido obtiene 50 puntos de valor de ataque por cada Aylánido en juego.", disclaimer: "" },
                    { Value: "Si durante la etapa del Aylánido, este no tiene al menos una carta adyacente con la sinergia <img src='/icons/acuatico.png'>, transforma el Aylánido en un Aylánido marchito.", disclaimer: "" },
                ],
                Triggered: [
                    { Value: "Si el efecto de una carta le hace objetivo, contrarresta dicho efecto y transforma la carta en un Aylánido.", disclaimer: "" },
                    { Value: "Al desactivarse, si durante la ronda el Aylánido ha convertido al menos otra carta en Aylánido, repite esta etapa.", disclaimer: "Tras esto, el juego continuará con el orden normal de etapas. Este efecto solo puede ocurrir una vez por ronda." }
                ],
                Global: []
            },
            augments: [
                { quality: "plata", effect: "El Aylánido obtiene 100 puntos de valor de ataque por cada Aylánido en juego." },
                { quality: "oro", effect: "El Aylánido obtiene 200 puntos de valor de ataque por cada Aylánido en juego." },
                { quality: "diamante", effect: "<img src='/icons/accion.png'> – Si las cartas adyacentes al Aylánido son Aylánidos, contrarresta todos los efectos activos y finaliza la etapa actual. Luego, transforma esta carta y las adyacentes en el Bosque de Aylánidos. Finalmente, el orden de etapas se reestablecerá en la Etapa de menor prontitud del Bosque de Aylánidos. Es decir, el curso de la partida puede volver atrás o incluso adelantarse dependiendo de la posición del bosque en el tablero." }
            ]
        },
        {
            name: "Aylánido marchito",
            name_id: "aylanido_marchito",
            rarity: "comun",
            base_quality: "bronce",
            max_quality: "bronce",
            spaces: 1,
            attack_value: 0,
            synergies: ["Pequeño", "Acuatico", "Arboreo", "Humanoide", "Inteligente"],
            type: "Monstruo_transformacion",
            effects: {
                Actions: [],
                Constants: [],
                Triggered: [],
                Global: []
            },
            augments: []
        },
        {
            name: 'Bosque de aylánidos',
            name_id: 'bosque_de_aylanidos',
            rarity: 'rara',
            base_quality: 'bronce',
            max_quality: 'diamante',
            spaces: 3,
            attack_value: 0,
            synergies: ['Colosal', 'Acuático', 'Arbóreo', 'Humanoide', 'Inteligente'],
            type: 'Monstruo fusión',
            effects: {
                Actions: [{ Value: 'Asalta al <img src="/icons/monstruo.png"> activo del oponente y lo convierte en Aylánido.', disclaimer: 'Si la carta activa no es un monstruo, se contrarresta.' }],
                Constants: [{ Value: 'Si el efecto de una carta le hace objetivo, contrarresta dicho efecto y transforma la carta en un Aylánido.', disclaimer: '' }],
                Triggered: [
                    { Value: 'El Bosque de aylánidos obtiene 50 <img src="/icons/ataque_estupido.png"> por cada Aylánido en juego.', disclaimer: '' },
                    { Value: 'El bosque de aylánidos cuenta como tres cartas de Aylánido a la hora del recuento de Aylánidos en juego.', disclaimer: '' }
                ],
                Global: []
            },
            augments: [
                { quality: "plata", effect: "El Bosque de aylánidos obtiene 100 puntos de valor de <img src='/icons/ataque_estupido.png'> por cada Aylánido en juego." },
                { quality: "oro", effect: "El Bosque de aylánidos obtiene 200 puntos de valor de <img src='/icons/ataque_estupido.png'> por cada Aylánido en juego." },
                { quality: "diamante", effect: "<img src='/icons/constante.png'> - Si todas las cartas en juego son Aylánidos, ganas la partida." }
            ]
        },
        {
            name: "Gor’grath",
            name_id: "gorgrath",
            rarity: "rara",
            base_quality: "bronce",
            max_quality: "diamante",
            spaces: 2,
            attack_value: 0,
            synergies: ["Grande", "Animal", "Inteligente", "Subterraneo"],
            type: "Monstruo",
            effects: {
                Actions: [
                    { Value: "El Gor’grath asalta a  un <img src='/icons/monstruo.png'> aleatorio de tu oponente que no sea <img src='/icons/forjado.png'> ni <img src='/icons/colosal.png'> y se lo come.", disclaimer: "Cuando un <img src='/icons/monstruo.png'> es comido, se destruye." }
                ],
                Constants: [],
                Triggered: [
                    { Value: "Cada vez que un <img src='/icons/monstruo.png'> no subterráneo ataca, el Gor’grath te otorga 50 <img src='/icons/escudo.png'>.", disclaimer: "" },
                    { Value: "Cuando el Gor’grath se come a otro Monstruo, aumenta en 50 los puntos de <img src='/icons/escudo.png'> que te otorga.", disclaimer: "" }
                ],
                Global: []
            },
            augments: [
                { quality: "plata", effect: "Aumenta los <img src='/icons/escudo.png'> otorgados y adicionales en 50 puntos." },
                { quality: "oro", effect: "La acción del Gor’grath ahora dice: El Gor’grath se come hasta dos <img src='/icons/monstruo.png'> aleatorios de tu oponente que no sean Forjados ni Colosales." },
                { quality: "diamante", effect: "Aumenta los <img src='/icons/escudo.png'> otorgados y adicionales en 100 puntos." }
            ]
        },
        {
            name: "Amuleto Piedrafunda",
            name_id: "amuleto_piedrafunda",
            rarity: "rara",
            base_quality: "plata",
            max_quality: "diamante",
            spaces: 1,
            attack_value: 200,
            synergies: ["Pequeño", "Mineral"],
            type: "Herramienta",
            effects: {
                Actions: [],
                Constants: [
                    { Value: "El Amuleto Piedrafunda aumenta en 200 el valor de escudo de los <img src='/icons/subterraneo.png'> adyacentes.", disclaimer: "" }
                ],
                Triggered: [
                    { Value: "Si un <img src='/icons/subterraneo.png'> adyacente fuera a ser objetivo de un efecto, el objetivo pasa a ser el Amuleto Piedrafunda.", disclaimer: "" }
                ],
                Global: []
            },
            augments: [
                { quality: "oro", effect: "Duplica los valores de escudo del Amuleto Piedrafunda." },
                { quality: "diamante", effect: "Ahora el efecto desencadenado del Amuleto Piedrafunda protege a cualquier <img src='/icons/subterraneo.png'> de tu tablero." }
            ]
        },
        {
            name: 'Obsidian',
            name_id: 'obsidian',
            rarity: 'rara',
            base_quality: 'bronce',
            max_quality: 'diamante',
            spaces: 2,
            attack_value: 0,
            synergies: ['Grande', 'Estúpido', 'Forjado', 'Humanoide', 'Ígneo'],
            type: 'Monstruo',
            effects: {
                Actions: [{ Value: 'Si hay espacio en tu tablero, lo llena con Obsidians jóvenes. Si no, Erupciona de ira y reduce a la mitad el valor de ataque de todos los <img src="/icons/monstruo.png"> de tu oponente.', disclaimer: '' }],
                Constants: [],
                Triggered: [
                    { Value: 'Cuando un Obsidian joven entra al tablero, el Obsidian te otorga 50 <img src="/icons/escudo.png">.', disclaimer: '' },
                    { Value: 'Cuando un Obsidian joven abandona el tablero, el Obsidian hace daño igual a tus <img src="/icons/escudo.png"> a tu oponente.', disclaimer: '' }
                ],
                Global: []
            },
            augments: [
                { quality: "plata", effect: "Aumenta el <img src='/icons/escudo.png'> otrogado por sus efectos en 150 puntos." },
                { quality: "oro", effect: "Aumenta el <img src='/icons/escudo.png'> otrogado por sus efectos en 150 puntos.." },
                { quality: "diamante", effect: "Actualiza las referencias de Obsidian joven a Obsidian joven enfurecido." }
            ]
        },
        {
            name: "Obsidian joven",
            name_id: "obsidian_joven",
            rarity: "comun",
            base_quality: "bronce",
            max_quality: "bronce",
            spaces: 1,
            attack_value: 50,
            synergies: ["Pequeño", 'Estúpido', "Forjado", "Humanoide", "Igneo"],
            type: "Monstruo_invocacion",
            effects: {
                Actions: [],
                Constants: [
                    { Value: "Tras su etapa de activación, este <img src='/icons/monstruo.png'> se destruye.", disclaimer: "" }
                ],
                Triggered: [],
                Global: []
            },
            augments: []
        },
        {
            name: "Obsidian joven enfurecido",
            name_id: "obsidian_joven_enfurecido",
            rarity: "infrecuente",
            base_quality: "bronce",
            max_quality: "bronce",
            spaces: 1,
            attack_value: 50,
            synergies: ["Pequeño", 'Estúpido', "Forjado", "Humanoide", "Igneo"],
            type: "Monstruo_invocacion",
            effects: {
                Actions: [
                    { Value: "Si se activan al mismo tiempo 5 o más Obsidian joven enfurecidos, el Tablero de ambos jugadores se agrieta y entra en erupción. Por el resto de la partida, todos los <img src='/icons/monstruo.png'> <img src='/icons/igneo.png'> ven su valor de ataque triplicado y los <img src='/icons/monstruo.png'> no ígneos ven su valor de ataque dividido por tres.", disclaimer: "Este efecto solo altera los valores de ataque mientras el tablero esté erupcionado. Un tablero erupcionado no puede volver a erupcionar." }
                ],
                Constants: [
                    { Value: "Tras su etapa de activación, este <img src='/icons/monstruo.png'> se destruye.", disclaimer: "" },
                    { Value: "Cuando uno o más Obsidian joven enfurecidos son creados, el efecto responsable queda en espera, y todos los Obsidian joven enfurecidos obtienen una etapa adicional en la que se activan al mismo tiempo.", disclaimer: "" }
                ],
                Triggered: [],
                Global: []
            },
            augments: []
        },
        {
            name: "Encantador de aprolas",
            name_id: "encantador_de_aprolas",
            rarity: "legendaria",
            base_quality: "diamante",
            max_quality: "diamante",
            spaces: 1,
            attack_value: 0,
            synergies: ["Pequeño", "Humanoide", "Inteligente", "Mágico"],
            type: "Monstruo",
            effects: {
                Actions: [
                    { Value: "Las aprolas en ambos tableros se activan al mismo tiempo y atacan a tu oponente.", disclaimer: "" }
                ],
                Constants: [
                    { Value: "Si otro efecto fuese a transformar o fusionar un monstruo, el resultado será una Aprola.", disclaimer: "" },
                    { Value: "Si un efecto fuera a transformar o fusionar al Encantador de aprolas, transforma el origen del efecto en una aprola.", disclaimer: "El efecto original se contrarresta" }
                ],
                Triggered: [
                    { Value: "Cuando un <img src='/icons/monstruo.png'> es transformado o fusionado en Aprola, todas las demás aprolas aumentan las probabilidades de su efecto de Acción en 1%.", disclaimer: "" }
                ],
                Global: []
            },
            augments: []
        },
        {
            name: "Cuerpo en descomposición",
            name_id: "cuerpo_en_descomposicion",
            rarity: "comun",
            base_quality: "bronce",
            max_quality: "diamante",
            spaces: 2,
            attack_value: 100,
            synergies: ["Grande", "Carne"],
            type: "Alimento",
            effects: {
                Actions: [],
                Constants: [
                    { Value: "Mientras tengas al menos un <img src='/icons/monstruo.png'> que no sea <img src='/icons/aberracion.png'> o <img src='/icons/cambiaformas.png'>, el cuerpo en descomposición en lugar de curarte te dañará.", disclaimer: "" }
                ],
                Triggered: [],
                Global: []
            },
            augments: [
                { quality: "plata", effect: "Duplica el valor de <img src='/icons/curacion.png'> del cuerpo en descomposición." },
                { quality: "oro", effect: "+Acción: Una criatura ni <img src='/icons/aberracion.png'> ni <img src='/icons/cambiaformas.png'> de tu rival huye del tablero." },
                { quality: "diamante", effect: "Duplica el valor de <img src='/icons/curacion.png'> del cuerpo en descomposición." }
            ]
        },
        {
            name: "Kandra",
            name_id: "kandra",
            rarity: "rara",
            base_quality: "oro",
            max_quality: "diamante",
            spaces: 1,
            attack_value: 200,
            synergies: ["Pequeño", "Aberracion", "Cambiaformas", "Inteligente"],
            type: "Monstruo",
            effects: {
                Actions: [
                    { Value: "Asalta al <img src='/icons/monstruo.png'> activo del oponente y lo destruye. El Kandra obtiene sus huesos.", disclaimer: "Si la carta activa no es un monstruo, se contrarresta. Si ya tenía unos huesos, abandona los anteriores." }
                ],
                Constants: [
                    { Value: "Si un efecto fuese a destruir al Kandra, el efecto se ejecuta, pero el Kandra no es destruido", disclaimer: "Si el efecto destructor, obtiene beneficios por destruir una carta, no los obtendrá. Si el Kandra estaba transformado, pierde los huesos y recupera su forma original." },
                ],
                Triggered: [
                    { Value: "Tras activarse, si tiene unos huesos y dispone de espacio, se transforma en el <img src='/icons/monstruo.png'> de los huesos.", disclaimer: "Seguirá siendo <img src='/icons/cambiaformas.png'> y convervará con su efecto <img src='/icons/constante.png'>." }
                ],
                Global: []
            },
            augments: []
        },
        {
            name: "TenSoon",
            name_id: "tensoon",
            rarity: "legendaria",
            base_quality: "diamante",
            max_quality: "diamante",
            spaces: 2,
            attack_value: 0,
            synergies: ["Grande", "Aberracion", "Animal", "Cambiaformas", "Inteligente", "Magico"],
            type: "Monstruo",
            effects: {
                Actions: [
                    { Value: "Si no se ha revelado, se revela y devora un <img src='/icons/animal.png'> <img src='/icons/grande.png'> de tu oponente, tomando su aspecto. Si tu oponente no tiene ningún <img src='/icons/animal.png'> <img src='/icons/grande.png'>, entonces toma forma de Huargo. Por el resto de la Etapa aumenta su valor de ataque en 800 puntos.", disclaimer: "" }
                ],
                Constants: [
                    { Value: "Mientras no sea activado, TenSoon se muestra como dos cartas de <img src='/icons/animal.png'> <img src='/icons/pequeño.png'> a tu elección. Elegidas antes de comenzar la partida.", disclaimer: "" },
                    { Value: "Si TenSoon es objetivo de una Habilidad antes de ser activado, se aplaza la Etapa actual y TenSoon obtiene una etapa adicional inmediata.", disclaimer: "" }
                ],
                Triggered: [
                    { Value: "Si TenSoon se revela durante una Etapa adicional obtiene 800 puntos de valor de ataque permanentes.", disclaimer: "" }
                ],
                Global: []
            },
            augments: []
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
                <div class="accion"><p class="title">Acción</p>
                ${cardData.effects.Actions.map(a => `
                    <img src="/icons/accion.png">
                    <p class="list">${a.Value}${a.disclaimer ? `<br><span class="disclaimer">** ${a.disclaimer}</span>` : ''}</p>                 
                `).join('')}
                </div>
            `;

            let textoConstantes = cardData.effects.Constants.length === 0 ? '' : `
                <div class="constante"><p class="title">Efectos constantes</p>
                ${cardData.effects.Constants.map(c => `
                    <img src="/icons/constante.png">
                    <p class="list">${c.Value}${c.disclaimer ? `<br><span class="disclaimer">** ${c.disclaimer}</span>` : ''}</p>                 
                `).join('')}
                </div>
            `;

            let textoDesencadenadas = cardData.effects.Triggered.length === 0 ? '' : `
                <div class="desencadenado"><p class="title">Efectos desencadenados</p>
                ${cardData.effects.Triggered.map(t => `
                    <img src="/icons/desencadenado.png">
                    <p class="list">${t.Value}${t.disclaimer ? `<br><span class="disclaimer">** ${t.disclaimer}</span>` : ''}</p>  
                `).join('')}
                </div>
            `;

            let textoGlobales = cardData.effects.Global.length === 0 ? '' : `
                <div class="global"><p class="title">Efectos globales</p>
                ${cardData.effects.Global.map(g => `
                    <img src="/icons/global.png">
                    <p class="list">${g.Value}${g.disclaimer ? `<br><span class="disclaimer">** ${g.disclaimer}</span>` : ''}</p>
                `).join('')}
                </div>
            `;

            let textoAumentos = cardData.augments.length === 0 ? '' : `
                <div class="augments_container">
                    <div class="augments"><p class="title">Avances en calidad</p>
                    ${cardData.augments.map(g => `
                        <img src='/icons/${g.quality}_icon.png'>
                        <p class="list">${g.effect}</p>
                    `).join('')}
                    </div>
                </div>
            `;

            let contentHtml = `
                <h1 class='${cardData.base_quality} col_span_2'>${cardData.name}</h1>
                <div class="rules_container ${cardData.augments.length > 0 ? '' : 'col_span_2'}">
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
        const basePath = '/icons/';
        if (card.type === 'Monstruo' || card.type === 'Monstruo_fusion' || card.type === 'Monstruo_invocacion' || card.type === 'Persona')
            return card.synergies.includes('Inteligente') ? `${basePath}ataque_inteligente.png` : `${basePath}ataque_estupido.png`;
        else if (card.type === 'Herramienta')
            return `${basePath}escudo.png`;
        else
            return `${basePath}curacion.png`;
    }

    getTypeIcon(card: Card): string {
        const basePath = '/icons/';
        return `${basePath}${card.type.toLowerCase()}.png`;
    }

    getTypeName(card: Card): string {
        if(!card.type.includes('_'))
            return card.type.replace('_', ' ');
        else
        {
            if(card.type === 'Monstruo_fusion')
                return 'Monstruo fusión'
            if(card.type === 'Monstruo_transformacion')
                return 'Monstruo transformación'
            if(card.type === 'Monstruo_invocacion')
                return 'Monstruo invocación'
        }
        return 'Error';
    }

    getSynergieIcon(synergie: string): string {
        const basePath = '/icons/';
        if(synergie === 'Pequeño')
            return `${basePath}${synergie.toLowerCase()}.png`;
        return `${basePath}${synergie.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}.png`;
    }
}