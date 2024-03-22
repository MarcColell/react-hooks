// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon';

const PokemonError = ({error}) => <div role="alert">
There was an error: <pre style={{whiteSpace: 'normal'}}>{error}</pre>
</div>

function PokemonInfo({pokemonName, handleError}) {
  // 🐨 Have state for the pokemon (null)
  const [pokemon, setPokemon] = React.useState(null);
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.

  const getPokemon = (value) => {
    setPokemon(null);
    fetchPokemon(value).then(response => setPokemon(response), error => handleError(error));
  };

  React.useEffect(() => {
    if(!pokemonName) return;
    getPokemon(pokemonName);

  }, [pokemonName]);
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
  let componentToReturn = null;

  if(!pokemon && !pokemonName) componentToReturn =  'submit a Pokemon';
  if(!pokemon && pokemonName) componentToReturn =  <PokemonInfoFallback name={pokemonName} />;
  if(pokemon) componentToReturn =  <PokemonDataView pokemon={pokemon} />;

  return componentToReturn;
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('');
  const [error, setError] = React.useState({hasError: false, message: ''});


  function handleSubmit(newPokemonName) {
    setError({...error, hasError: false});
    setPokemonName(newPokemonName)
  }

  function handleError(errors) {
    setError({message: errors?.message, hasError: true});
  }
  console.log(error);
  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      {error.hasError ? <PokemonError error={error.message}/> : <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} handleError={handleError}/>
      </div>}
    </div>
  )
}

export default App
