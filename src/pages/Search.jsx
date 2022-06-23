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
        getNewPup();
    }, []);

    const getNewPup = () => {
        authAxios.get('http://localhost:5005/api/matches/find')
            .then(response => {
                setDog(response.data)
            })
    }


    const postView = status => {
        authAxios.post('http://localhost:5005/api/matches/like', {
            status: status,
            dog_id: dog._id
        })
            .then(response => getNewPup())
            .catch(e => console.log(e));
    }

    return (
        <>
            <h2>Search</h2>
            <div className="card content-small">
                <img
                    src={ dog.imageUrl }
                    alt="dog"
                    width={ 200 }
                />
                <h3>{ dog.name }</h3>
                <div>
                    { dog.age } year(s) old<br/>
                    { dog.gender } <br/>
                    { dog.size } <br/>
                    { dog.breed } <br/>
                    { dog.about } <br/>
                </div>
                <div className="btn-group">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={ () => postView('liked') }
                    >
                        Good { dog.gender === 'male' ? 'boy' : 'girl' }
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={ () => postView('disliked') }
                    >
                        Bad { dog.gender === 'male' ? 'boy' : 'girl' }
                    </button>
                </div>
            </div>
        </>
    )
}

export default Search