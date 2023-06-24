import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import GetResidents from '../GetResidents';
import './planetDetails.css'

function PlanetDetails(){

    const {planetId} = useParams()
    const history = useHistory()

    const [planetData, setPlanetData] = useState({})
    const [PageLoading, setPageLoading] = useState(false)
    const [residents, setResidents] = useState([])
    const [receivedApiPlanetData, setReceivedApiPlanetData] = useState(false)



    useEffect(() => {
        // fetching planet details from planetId in url
        async function getPlanetDetails(planetId){

            if(PageLoading) return

            setPageLoading(true)

            // fetching planet data
            const planetDetailsFetch = await fetch(`https://swapi.dev/api/planets/${planetId}/`)
            const planetInfo = await planetDetailsFetch.json()

            setPlanetData(planetInfo)
            setResidents(planetInfo.residents)
            setReceivedApiPlanetData(true)
            setPageLoading(false)

            return
        }
        getPlanetDetails(planetId)

    }, [])


    function backToHomePage(){

        history.push('/')
        return
    }

        return (

            <div className='planet-details-container'>

                <h2 className='page-title'>{planetData.name}</h2>

                {PageLoading && <div className='loading-notif'> Loading...</div>}

                <button
                    className='homepage-button'
                    onClick={() => backToHomePage() }
                > All Planets
                </button>

                <div className='planet-data-section'>

                  <div className='planet-data-third'>
                    <div className='planet-detail-category'>
                        <text className='planet-detail-category-label'>Rotation Period</text>
                        <div className='planet-detail-category-data'>{planetData.rotation_period}  </div>
                    </div>

                    <div className='planet-detail-category'>
                         <text className='planet-detail-category-label'>Orbital Period</text>
                         <div className='planet-detail-category-data'>{planetData.orbital_period}  </div>
                    </div>

                    <div className='planet-detail-category'>
                        <text className='planet-detail-category-label'>Diameter</text>
                        <div className='planet-detail-category-data'>{planetData.diameter}  </div>
                    </div>

                    <div className='planet-detail-category'>
                         <text className='planet-detail-category-label'>Surface Water</text>
                         <div className='planet-detail-category-data'>{planetData.surface_water}  </div>
                    </div>
                 </div>
                 <div className='planet-data-third'>
                    <div className='planet-detail-category'>
                        <text className='planet-detail-category-label'>Climate</text>
                        <div className='planet-detail-category-data'>{planetData.climate}  </div>
                    </div>

                    <div className='planet-detail-category'>
                        <text className='planet-detail-category-label'>Terrain</text>
                        <div className='planet-detail-category-data'>{planetData.terrain}  </div>
                    </div>

                    <div className='planet-detail-category'>
                        <text className='planet-detail-category-label'>Gravity</text>
                        <div className='planet-detail-category-data'>{planetData.gravity}  </div>
                    </div>

                    <div className='planet-detail-category'>
                        <text className='planet-detail-category-label'>Population</text>
                        <div className='planet-detail-category-data'>{planetData.population}  </div>
                    </div>
                 </div>
                 <div className='planet-data-third'>
                    <div className='planet-detail-category'>
                     <text className='planet-detail-category-label'>Residents</text>

                     <div>
                         {(receivedApiPlanetData && residents.length === 0) && <div className='planet-detail-category-data'>None </div>}

                         {(receivedApiPlanetData && residents.length > 0) && <GetResidents residents = {{residents}}/>}
                     </div>

                    </div>
                 </div>
                </div>

            </div>
        )


}


export default PlanetDetails
