import React from 'react';
import './GeneralInformation.css'
import Vehicles from './Vehicles';

function CharacterDetails({ character }) {

    if (!character) {
        return <p className='selectionCharacter'>Select a character to view details</p>;
    }

    return (
        <>
            <div className='generalInformation-container'>
                <h1 className='generalInformation-title'>General Information</h1>
                <div className='containerInformation'>
                    <h2 className='generalInformation-detailTitle'>Eye Color: </h2><h2 className='generalInformation-detail'>{character.eye_color}</h2>
                </div>
                <div className='containerInformation'>
                    <h2 className='generalInformation-detailTitle'>Hair Color: </h2><h2 className='generalInformation-detail'>{character.hair_color}</h2>
                </div>
                <div className='containerInformation'>
                    <h2 className='generalInformation-detailTitle'>Skin Color: </h2><h2 className='generalInformation-detail'>{character.skin_color}</h2>
                </div>
                <div className='containerInformation'>
                    <h2 className='generalInformation-detailTitle'>Birth Year: </h2><h2 className='generalInformation-detail'>{character.birth_year}</h2>
                </div>
                <Vehicles vehiclesUrls={character.vehicles} />
            </div>

        </>
    );
}

export default CharacterDetails;