export interface IV {
    attack: number;
    defense: number;
    hp: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  }
  
  export interface Pokemon {
    name: string;
    sprite: string;
    types: string[];
    iv: IV;
    description: string;
    japaneseName: string;
    height: number;
    weight: number;
  }