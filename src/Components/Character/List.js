import React, {useState, useEffect} from 'react';
import Character from './Character';
import Pagination from './Pagination';

export default function List() {
    const [characters, setCharacter] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [currentPageUrl, setCurrentPageUrl] = useState("https://rickandmortyapi.com/api/character");
    const [nextPageUrl, setNextPageUrl] = useState();
    const [prevPageUrl, setPrevPageUrl] = useState();
    const [pages, setPages] = useState();

    useEffect(() => {
        const url = currentPageUrl;

        async function fetchData() {
            const data = await fetch(url);
            const {info, results} = await data.json();

            setCharacter(results);

            setLoading(false);

            setNextPageUrl(info.next);
            setPrevPageUrl(info.prev);
            setPages(info.pages);
            console.log(info.prev);
        }

        fetchData();
    }, [currentPageUrl]);

    const nextPage = () => {
        setCurrentPageUrl(nextPageUrl);

    }

    const prevPage = () => {
        setCurrentPageUrl(prevPageUrl);
    }

    const goToPage = (num) => {
        setCurrentPageUrl(`https://rickandmortyapi.com/api/character?page=${num}`);
    }

    if(loading)
        return (<div>Loading...</div>)

    return (
        <div>
            <h2>Characters</h2>
            <Pagination 
                nextPage = {nextPageUrl}
                prevPage = {prevPageUrl}
                goToPage = {goToPage}
                pages = {pages}
                goToPrevPage = {prevPage}
                goToNextPage = {nextPage}
            />
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
            <Pagination 
                nextPage = {nextPageUrl}
                prevPage = {prevPageUrl}
                goToPage = {goToPage}
                pages = {pages}
                goToPrevPage = {prevPage}
                goToNextPage = {nextPage}
            />
        </div>
    )
}