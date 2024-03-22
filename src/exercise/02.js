// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState() {
  function getValue(key) {
    return localStorage.getItem(key);
  };
  function setValue(key, value){
    localStorage.setItem(key, value);
  };

  return {
    getValue,
    setValue,
  };

}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const { getValue, setValue} = useLocalStorageState();

  const storageName = getValue('name') ?? initialName;


  const [name, setName] = React.useState(() => storageName)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  React.useEffect(() => {
    setValue('name', name);
  }, [name]);

  function handleChange(event) {
    const newName = event.target.value;

    setName(newName);
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
