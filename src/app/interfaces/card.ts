export interface Card {
    name: string;
    name_id: string;
    rarity: string;
    spaces: number;
    attack_value: number;
    synergies: string[];
    type: string;
    effects: {
        Actions: string[];
        Constants: string[];
        Triggered: string[];
        Global: string[];
    };
}
