import React, { useEffect, useState } from 'react';
import { NavLink} from 'react-router-dom';


function Homepage(){

    const [allPlanets, setAllPlanets] = useState([])
    const [page, setPage] = useState(1)


    useEffect(() => {

        async function getPlanets(){

            // fetch page worth of planets
            const fetchPlanets = await fetch(`https://swapi.dev/api/planets/?page=${page}`)
            const planetData = await fetchPlanets.json()

            setAllPlanets(planetData.results)
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
                >
                    Previous
                </button>
                }

                {page < 6 &&
                <button
                className='navigation-buttons'
                onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
                }

            </div>



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
