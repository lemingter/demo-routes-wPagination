import React, {useState, useEffect} from 'react';
import Character from './Character';

export default function List() {
    const [characters, setCharacter] = useState([]);

    

    useEffect(() => {
        async function fetchData() {
            const data = await fetch("https://rickandmortyapi.com/api/character");
            const {results} = await data.json();
            setCharacter(results);
        }

        fetchData();
    }, [characters.length]);

    return (
        <div>
            <h2>Characters</h2>
            <div className="row">
                {
                characters.map((character) => (
                    <Character
                        key={character.id}
                        name={character.name}
                        origin={character.origin}
                        image={character.image}
                    />
                ))
                }
            </div>
        </div>
    )
}