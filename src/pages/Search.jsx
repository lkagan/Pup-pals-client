// show random dog from DB
//dislplay all dog info 
// user has the option to like or diskile a dog
// liked dogs get saved to the dog model and DB and removed from array
// disliked dogs get removed from the array of dogs from DB
// if both users like each other their profiles get saved in matches
import React, { useEffect, useState } from 'react';
import { authAxios } from '../customAxios/authAxios';

function Search() {
  const [dog, setDog] = useState({});

  useEffect(() => { 
    authAxios.get('http://localhost:5005/api/matches/find')
      .then(response => {
        setDog(response.data)
      })
  }, []);

  return (
    <>
    <div>Search</div>
    <ul>
        <img src={dog.imageUrl} alt="dog" width={200}/>
        <li>{dog.name}</li>
        <li>{dog.age}</li>
        <li>{dog.gender}</li>
        <li>{dog.size}</li>
        <li>{dog.breed}</li>
        <li>{dog.about}</li>

      
    </ul>
    </>
  )
}

export default Search