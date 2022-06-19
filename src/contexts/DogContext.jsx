import { createContext, useState, useEffect } from 'react';

const DogContext = createContext();

export const DogProvider = ({ children }) => {
  const [dog, setDog] = useState(
    JSON.parse(localStorage.getItem('dog')) || null
  );

  useEffect(() => {
    localStorage.setItem('dog', JSON.stringify(dog));
  }, [dog]);

  return (
    //Whichever states/function we want to use as a global variable(useState), you have to pass it as a value
    <DogContext.Provider value={{ dog, setDog }}>
      {children}
    </DogContext.Provider>
  );
};

export default DogContext;

//To create a context
//1. Create a context.jsx file, add all the necessary boilerplate code and the states
//2. Wrap your App with contexProvider in App.js
//3. Use useContext(contextName) method to get your states values in any components/pages you want.