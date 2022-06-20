// show all matches 
// view profile of matched dog profile and their hooman
// unmatch to delete dog from matches 

import React, { useEffect, useState } from 'react';
import { authAxios } from '../customAxios/authAxios';


function MyMatches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => { 
    authAxios.get('http://localhost:5005/api/matches')
      .then(response => {
        setMatches(response.data)
      })
  }, []);

  return (
    <>
    <div>MyMatches</div>
    <ul>
      { matches?.map(match => (
        <li key={match._id}>
          <img src={match.imageUrl} alt="dog" width={200}/>
          {match.name}
          </li>
      ))}
    </ul>
    </>
  )
}

export default MyMatches