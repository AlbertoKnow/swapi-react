import React, { useState, useEffect } from 'react';
import './SpecieCharacter.css'

function SpeciesInfo({ speciesUrl }) {
  const [speciesInfo, setSpeciesInfo] = useState(null);

  useEffect(() => {
    async function fetchSpeciesInfo() {
      try {
        const response = await fetch(speciesUrl);
        const data = await response.json();
        setSpeciesInfo(data);
      } catch (error) {
        console.error('Error fetching species info:', error);
      }
    }

    if (speciesUrl) {
      fetchSpeciesInfo();
    }
  }, [speciesUrl]);

  if (!speciesInfo) {
    return null;
  }

  return (
    <div className='species-info'>
      <p>{speciesInfo.name}</p>
    </div>
  );
}

export default SpeciesInfo;