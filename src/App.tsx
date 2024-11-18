// src/App.tsx
import { useEffect, useState } from 'react';
import './assets/styles/App.scss';
import Pokeball from '/pokeball.svg';
import Pokemon from './components/Pokemon';
import PokemonFull from './components/PokemonFull';
import { getManyPokemon, getSinglePokemon } from './utils/api';
import { handleSearchTermChange, handleFormSubmit } from './utils/formHandlers';
import { PokemonDetails, ManyPokemon } from './interfaces/Interfaces';


const App: React.FC = () => {
  const [pokedexIndex, setPokedexIndex] = useState<ManyPokemon[]>([]);
  const [pokedexSingle, setPokedexSingle] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');


  const [fetchUrl, setFetchUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon?limit=12');
  const [next , setNext] = useState<string | null>(null);
  const [prev , setPrev] = useState<string | null>(null);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null)
      const data = await getManyPokemon(fetchUrl);
      setPokedexSingle(null);
      setSearchTerm('');
      setPokedexIndex(data.results);
      setNext(data.next);
      setPrev(data.previous);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const fetchSinglePokemon = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await getSinglePokemon(searchTerm);
      setPokedexSingle(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setIsSubmitted(false);
    }
  };

  const reset = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setPokedexSingle(null);
    setError(null);
    setSearchTerm('');
    setFetchUrl('https://pokeapi.co/api/v2/pokemon?limit=12');
  }

  useEffect(() => {
    fetchData();
  }, [fetchUrl]);


  useEffect(() => {
    if (isSubmitted) {
      fetchSinglePokemon();
    }
  }, [isSubmitted]);


  // If search term removed, empty details in state on single Pokemon
  // This will help our logic for redisplaying the default directory
  useEffect(() => {
    if (searchTerm === '') {
      fetchData();
    }
  }, [searchTerm]);

  return (
    <>
      <div className="pokeball">
        <img src={Pokeball} alt="Pokeball" width="100" height="100" />
      </div>
      <h1 className="text-yellow">Pokedex</h1>
      <form
        className="search flex gap-5 mb-10 justify-center"
        onSubmit={(e) => handleFormSubmit(e, setIsSubmitted)}
      >
        <input
          type="text"
          placeholder="Enter a Pokemon name"
          value={searchTerm}
          onChange={(e) => handleSearchTermChange(e, setSearchTerm)}
          name="searchterm"
          disabled={isSubmitted}
        />
        <button type="submit" disabled={isSubmitted}>
          Find
        </button>
      </form>
      {loading && <p>Loading Pokémon...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && !pokedexSingle && (
        <>
          {prev !== null && <a href="#" className="reset" onClick={(e) => reset(e)}>Reset</a>}
          <ul className="pokemon">
            {pokedexIndex.map((pokemon) => (
              <li key={pokemon.name}>
                <Pokemon url={pokemon.url} />
              </li>
            ))}
          </ul>

          <div className="pagination">
              {prev && <button onClick={() => setFetchUrl(prev)}>Prev</button>}
              {next && <button onClick={() => setFetchUrl(next)}>Next</button>}
          </div>
        
        </>
      )}
      {!loading && !error && searchTerm !== '' && pokedexSingle && (
       <>
         <a href="#" className="reset" onClick={(e) => reset(e)}>Reset</a>
         <PokemonFull pokedexSingle={pokedexSingle} />
       </>
      )}
      {error && (
        <>
          <p className="text-white">No Pokemon were found</p>
          <a
            href="#"
            className="text-white underline"
            onClick={(e) => reset(e)}
          >
            Reset
          </a>
        </>
      )}
    </>
  );
};

export default App;
