import React, { useState, useEffect } from 'react';

function Vehicles({ vehiclesUrls }) {
  const [vehiclesInfo, setVehiclesInfo] = useState([]);

  useEffect(() => {
    async function fetchVehiclesInfo() {
      try {
        const promises = vehiclesUrls.map(vehicleUrl =>
          fetch(vehicleUrl).then(response => response.json())
        );
        const responses = await Promise.all(promises);
        setVehiclesInfo(responses);
      } catch (error) {
        console.error('Error fetching vehicles info:', error);
      }
    }

    fetchVehiclesInfo();
  }, [vehiclesUrls]);

  return (
    <div className='vehicles-info'>
      <h1 className='generalInformation-title'>Vehicles</h1>
      <ul>
        {vehiclesInfo.map(vehicle => (
          <li
            key={vehicle.name}
            className='generalInformation-detailTitle'>
            {vehicle.name}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Vehicles;
