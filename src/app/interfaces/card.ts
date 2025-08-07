export interface Card {
    name: string;
    name_id: string;
    img_url: string;
    rarity: string;
    base_quality: string;
    max_quality: string;
    spaces: number;
    attack_value: number;
    shield_value: number;
    heal_value: number;
    synergies: string[];
    type: string;
    effects: {
        Actions: effect[];
        Constants: effect[];
        Triggered: effect[];
        Global: effect[];
    };
    augments: Augment[];
}

export interface effect {
    Value: string;
    disclaimer: string;
}

export interface Augment {
    quality: string;
    effect: string;
}