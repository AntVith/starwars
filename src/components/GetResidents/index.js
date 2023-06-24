import React, { useEffect, useState } from 'react';


function GetResidents({residents}){
    const residentUrls = residents.residents

    const [residentNames, setResidentNames] = useState([])
    const [loadingNames, setLoadingNames] = useState(false)

    useEffect(() => {

        // fetching resident data to poluate with names
        async function getResidentsNames(residentUrls){

            let allResidentNames = []

            if(loadingNames) return
            setLoadingNames(true)

            // iterate thru urls fetching resident data
            for(const url of residentUrls){
                const residentFetch = await fetch(url)
                const residentData = await residentFetch.json()
                allResidentNames.push(residentData.name)
            }

            setResidentNames(allResidentNames)
            setLoadingNames(false)
            return
        }

        getResidentsNames(residentUrls)

    }, [])


    return (

        <div className='resident-names-container'>

            {loadingNames && <div> loading...</div>}

            <div className='resident-names'>
                {!loadingNames && residentNames.map(name => {

                    return (
                        <div className='indiv-name'
                        key={name}
                        >
                            {name}
                        </div>
                    )
                })}
            </div>

        </div>
    )





}

export default GetResidents
