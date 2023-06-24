import React, { useEffect, useState } from 'react';
import { NavLink} from 'react-router-dom';
import './homepage.css'


function Homepage(){

    const [allPlanets, setAllPlanets] = useState([])
    const [page, setPage] = useState(1)
    const [PageLoading, setPageLoading] = useState(false)
    const [lastPage, setLastPage] = useState(1)


    useEffect(() => {

        async function getPlanets(){
            setPageLoading(true)

            // fetch page worth of planets
            const fetchPlanets = await fetch(`https://swapi.dev/api/planets/?page=${page}`)
            const planetData = await fetchPlanets.json()

            setAllPlanets(planetData.results)
            setLastPage(getTotalPages(planetData.count))
            setPageLoading(false)
            return
        }

        getPlanets()
    }, [page])

    function getTotalPages(planetCount){

        if(planetCount % 10 === 0){
            const totalPages = (planetCount / 10)
            return totalPages
        } else{
            const totalPages = Math.floor(planetCount / 10) + 1
            return totalPages
        }
    }

    function getPlanetId(url){
        const urlPortions = url.split('/')
        const planetID = urlPortions[5]

        return planetID

    }

    return (

        <div className='homepage'>

            <h1 className='page-title'>Star Wars Planets</h1>

            <div className='navigation'>

                {page > 1 &&
                <button
                className='navigation-buttons'
                onClick={() => setPage(page - 1)}
                disabled={PageLoading}
                >
                    Previous
                </button>
                }

                <div className='page-notif'> {page} / {lastPage}</div>

                {page < lastPage &&
                <button
                className='navigation-buttons'
                onClick={() => setPage(page + 1)}
                disabled={PageLoading}
                >
                    Next
                </button>
                }

            </div>

            {PageLoading && <div className='loading-notif'> Loading...</div>}



            <div className='planet-list'>

                {allPlanets && allPlanets.map(planet => {

                    return (

                        <NavLink
                        to={`/planet/${getPlanetId(planet.url)}`}
                        key={planet.name}
                        className='indiv-planet'
                        >
                            <div className='homepage-planet-name-container'>
                                <div className='homepage-planet-name'>
                                    {planet.name}
                                </div>
                            </div>

                        </NavLink>
                    )
                })}

            </div>

        </div>

    )

}

export default Homepage
