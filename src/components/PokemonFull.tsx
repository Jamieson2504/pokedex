import React, { useState } from 'react';
import { PokemonDetails } from '../interfaces/Interfaces';

interface PokemonFullProps {
  pokedexSingle: PokemonDetails | null;
}

const PokemonFull: React.FC<PokemonFullProps> = ({ pokedexSingle }) => {

const [isPlaying, setIsPlaying] = useState<boolean>(false);

const playSound = (e: React.MouseEvent<HTMLElement>, soundFile: string | undefined) => {
    if(soundFile && isPlaying == false) {
      e.preventDefault();
      setIsPlaying(true);
      var sound = new Audio();
      sound.autoplay = true;
      sound.src = soundFile;
      sound.play();
      setTimeout(() => { setIsPlaying(false); }, 2000)
    }
  };


  if (!pokedexSingle) return null;

  return (
    <div className="pokemon pokemon--single">
      <div className="pokemon__item pokemon__item--detailed">
        <h3 className="pokemon__title md:hidden">{pokedexSingle.name}</h3>
        <div className="pokemon__left">
          {pokedexSingle.sprites.front_default && (
            <div className="pokemon__image">
              <img src={pokedexSingle.sprites.front_default} alt={pokedexSingle.name} />
            </div>
          )}
          {pokedexSingle.sprites.back_default && (
            <div className="pokemon__image">
              <img src={pokedexSingle.sprites.back_default} alt={pokedexSingle.name} />
            </div>
          )}
          {pokedexSingle.sprites.front_shiny && (
            <div className="pokemon__image">
              <img src={pokedexSingle.sprites.front_shiny} alt={pokedexSingle.name} />
            </div>
          )}
          {pokedexSingle.sprites.back_shiny && (
            <div className="pokemon__image">
              <img src={pokedexSingle.sprites.back_shiny} alt={pokedexSingle.name} />
            </div>
          )}
          <a
            href="#"
            onClick={(e) => playSound(e, pokedexSingle.cries.legacy)}
            className="w-full hidden md:block text-center py-[10px] px-[15px] rounded-[10px] bg-[#100f0f] mt-auto text-white block"
          >
            Say hello
          </a>
        </div>

        <div className="pokemon__right">
          <span className="pokemon__id">#{pokedexSingle.id}</span>
          <h3 className="pokemon__title hidden md:block">{pokedexSingle.name}</h3>

          <div className="pokemon__desc">
            <p>{pokedexSingle.height && `Height: ${pokedexSingle.height / 10}m`}</p>
            <p>Weight: {pokedexSingle.weight}lbs</p>
            <p>
              Types:&nbsp;
              {pokedexSingle.types.map((type, idx) => (
                <span key={type.type.name} className="capitalize">
                  {type.type.name}
                  {idx + 1 !== pokedexSingle.types.length ? ', ' : ''}
                </span>
              ))}
            </p>
            <p>
              Abilities: {pokedexSingle.abilities.map((ability) => ability.ability.name).join(', ')}
            </p>
            <ul>
              {pokedexSingle.stats.map((stat) => (
                <li key={stat.stat.name} data-name={stat.stat.name}>
                  <span className="stat-name">{stat.stat.name.replaceAll('-', ' ')}:</span> {stat.base_stat}
                </li>
              ))}
            </ul>
            <a
              href="#"
              onClick={(e) => playSound(e, pokedexSingle.cries.legacy)}
              className="w-full block md:hidden text-center py-[10px] px-[15px] rounded-[10px] bg-[#100f0f] mt-5 text-white block"
            >
              Say hello
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonFull;
