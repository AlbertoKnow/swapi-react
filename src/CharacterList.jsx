import React, { useState, useEffect } from 'react';
import Error from './ErrorLoading';
import './CharacterListStyles.css'
import GeneralInformation from './GeneralInformation';
import SpeciesInfo from './SpecieCharacter';
import { ThreeDots } from 'react-loader-spinner'


function CharacterList() {
    const baseUrl = 'https://swapi.dev/api/people/?page=';
    const totalPages = 9;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const promises = [];

                for (let page = 1; page <= totalPages; page++) {
                    const url = `${baseUrl}${page}`;
                    promises.push(fetch(url).then(response => response.json()));
                }

                const responses = await Promise.all(promises);

                const combinedData = responses.flatMap(response => response.results);
                setData(combinedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
                setError('Error conectando a la API');
            }
        }

        fetchData();
    }, []);

    const handleCharacterClick = character => {
        setSelectedCharacter(character);
    };

    return (
        <div className='parent'>
            <aside className='sidebar'>
                {loading ? (
                    <ThreeDots
                        height="50"
                        width="50"
                        radius="9"
                        color="fff"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                ) : (
                    error ? (
                        <Error />
                    ) : (
                        <ul>
                            {data.map(character => (
                                <li
                                    key={character.name}
                                    onClick={() => handleCharacterClick(character)}
                                    className='character'
                                >
                                    <a href="#" className='character-name'>
                                        <h2>{character.name}</h2>
                                        <SpeciesInfo speciesUrl={character.species[0]} />
                                    </a>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='arrow-svg'>
                                        <g clipPath="url(#clip0_17637_79)">
                                            <path d="M8.58984 16.59L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.59Z" fill="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_17637_79">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </li>
                            ))}
                        </ul>
                    )
                )}
            </aside>
            <div className='info'>
                <GeneralInformation character={selectedCharacter} />
            </div>
        </div>
    );
}

export default CharacterList;
