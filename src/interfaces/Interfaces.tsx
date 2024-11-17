interface ApiResponse {
    next: string | null;
    previous: string | null;
    results: ManyPokemon[];
}

interface ManyPokemon {
    name: string;
    url: string;
}

interface PokemonAbility {
    ability: {
      name: string;
    };
  }

interface PokemonType {
    type: {
        name: string;
    };
}

interface PokemonStat {
    base_stat: number;
    stat: {
      name: string;
    };
  }
  
interface PokemonDetails {
    id: number,
    name: string;
    height: number;
    weight: number;
    sprites: {
        back_default: string;
        back_shiny: string;
        front_default: string;
        front_shiny: string;
    };
    types: PokemonType[];
    abilities: PokemonAbility[];
    stats: PokemonStat[];
    cries: {
        legacy: string;
    };
}

interface PokemonProps {
    url: string;
}

export type {
    ApiResponse,
    ManyPokemon, 
    PokemonDetails, 
    PokemonProps
}