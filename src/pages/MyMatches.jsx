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
    <h2>My Matches</h2>
      <div className="content-large matches-container">
        { matches?.map(match => (
          <div className="card content-small" key={match._id}>
            <img className="img" src={match.imageUrl} alt="dog" width={200}/>
            <h3>{match.name}</h3>
            </div>
        ))}
        </div>
    </>
  )
}

export default MyMatches