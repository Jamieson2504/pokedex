// src/utils/api.ts
import { ApiResponse, PokemonDetails } from '../interfaces/Interfaces';

export const getManyPokemon = async (fetchUrl: string): Promise<ApiResponse> => {
  const response = await fetch(fetchUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const getSinglePokemon = async (searchTerm: string): Promise<PokemonDetails> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};
