// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name({name, onNameChange}) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={(event) => onNameChange(event, 'name')} />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({ animal, onAnimalChange}) {
  // 💣 delete this, it's now managed by the App

  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={event => onAnimalChange(event, 'animal')}
      />
    </div>
  )
}

// 🐨 uncomment this
 function Display({name, animal}) {
   return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
 }


function App() {
  // 🐨 add a useState for the animal
  const [name, setName] = React.useState(() => (''));
  const [animal, setAnimal] = React.useState(() => (''));


  const handleOnChange = (e, isFrom) => {
    const value = e.target.value;

    if(isFrom === 'animal') {
      setAnimal(value);
      return;
    }

    setName(value);
  };

  return (
    <form>
      <Name name={name} onNameChange={handleOnChange} />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal animal={animal} onAnimalChange={handleOnChange}/>
      {/* 🐨 pass the animal prop here */}
      <Display name={name} animal={animal}/>
    </form>
  )
}

export default App
