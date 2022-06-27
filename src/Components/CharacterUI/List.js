import React, {useState, useEffect} from 'react';
import Character from './Character';
import PaginationUI from './Pagination';
import "./List.css";

export default function List() {
    const [characters, setCharacter] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [currentPageUrl, setCurrentPageUrl] = useState("https://rickandmortyapi.com/api/character");
    const [currentPageNum, setCurrentPageNum] = useState(1);
    const [pages, setPages] = useState();

    useEffect(() => {
        const url = currentPageUrl;

        async function fetchData() {
            const data = await fetch(url);
            const {info, results} = await data.json();

            setCharacter(results);

            setLoading(false);

            setPages(info.pages);
        }

        fetchData();
    }, [currentPageUrl]);

    const goToPage = (num) => {
        setCurrentPageUrl(`https://rickandmortyapi.com/api/character?page=${num}`);
        setCurrentPageNum(num);
    }

    if(loading)
        return (<div>Loading...</div>)

    return (
        <div>
            <h2>Characters</h2>
            <div className="PaginationUI">
                <PaginationUI 
                    currentPage = {currentPageNum}
                    goToPage = {goToPage}
                    pages = {pages}
                />
            </div>
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
            <div className="PaginationUI">
                <PaginationUI 
                    currentPage = {currentPageNum}
                    goToPage = {goToPage}
                    pages = {pages}
                />
            </div>
        </div>
    )
}