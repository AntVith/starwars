import React, { useEffect, useState } from 'react';
import { NavLink} from 'react-router-dom';


function Homepage(){

    const [allPlanets, setAllPlanets] = useState([])
    const [page, setPage] = useState(1)
    const [PageLoading, setPageLoading] = useState(false)


    useEffect(() => {

        async function getPlanets(){
            setPageLoading(true)

            // fetch page worth of planets
            const fetchPlanets = await fetch(`https://swapi.dev/api/planets/?page=${page}`)
            const planetData = await fetchPlanets.json()

            setAllPlanets(planetData.results)
            setPageLoading(false)
            return


        }
        getPlanets()
    }, [page])

    function getPlanetId(url){
        const urlPortions = url.split('/')
        const planetID = urlPortions[5]

        return planetID

    }

    return (

        <div classNmae='homepage'>

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

                {page < 6 &&
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
                            {planet.name}
                        </NavLink>
                    )
                })}

            </div>

        </div>

    )

}

export default Homepage
