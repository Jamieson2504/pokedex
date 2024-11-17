import React, { useEffect, useState } from 'react';
import {PokemonDetails, PokemonProps} from '../interfaces/Interfaces'


const Pokemon: React.FC<PokemonProps> = ({ url }) => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const playSound = (e: React.MouseEvent<HTMLElement>, soundFile: string | undefined) => {
    if(soundFile && isPlaying == false) {
      e.preventDefault();
      setIsPlaying(true);
      var sound = new Audio(soundFile);
      sound.play();
      setTimeout(() => { setIsPlaying(false); }, 2000)
    }
  };

  useEffect(() => {
    setLoading(true);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: PokemonDetails) => {
        setPokemon(data);
      })
      .catch(error => {
        setError(error.message || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  if (loading) return (
    <div className='pokemon__item'>
      <div className="pokemon__title pokemon__title--placeholder"></div>
      <div className="pokemon__image"></div>
      <div className="pokemon__desc pokemon__desc--placeholder"></div>
    </div>
  );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='pokemon__item'>
      <h3 className="pokemon__title">{pokemon?.name}</h3>
      <span className="pokemon__id">#{pokemon?.id}</span>
      <div className="pokemon__image">
        <img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
      </div>
      <div className="pokemon__desc">
        <p>{pokemon?.height && `Height: ${pokemon?.height/10}m`}</p>
        <p>Weight: {pokemon?.weight}lbs</p>
        <p>Types:&nbsp;
          {pokemon?.types.map((type, idx) => (
          <span key={type.type.name} className='capitalize'>
            {type.type.name}{(idx + 1 !== pokemon.types.length) ? ', ' : ''}
          </span>
          ))}
        </p>
      </div>
      <a 
        href="#" 
        onClick={(e) => playSound(e, pokemon?.cries.legacy)}
        className='w-full text-center py-[10px] px-[15px] rounded-[10px] bg-[#100f0f] mt-auto text-white block'
      >
          Say hello
      </a>
    </div>
  );
};

export default Pokemon;
