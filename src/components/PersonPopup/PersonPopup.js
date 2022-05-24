import React from 'react';
import './PersonPopup.css'

import {useEffect, useState} from 'react'
import axios from 'axios';

function PersonPopup({active, setActive, children, characterID}) {

    const [character, setCharacter] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(`https://rickandmortyapi.com/api/character/${characterID}`)
                setCharacter(data.results)
            } catch (error) {
                console.error(error)
            }
        }
    
        fetchData()
      }, [])
    

    return (
        <div className={active ? "PersonPopup active" : "PersonPopup"} onClick={() => setActive(false)}> 
            <div className={active ? "popup active" : "popup"} onClick={e => e.stopPropagation()}>
                {children}
                <div className="card">
                    {character.map(character1 => (
                        <div>
                            {character1.name}
                        
                        </div>
                  ))}
                </div>
            </div>
        </div>
    )
}   



export default PersonPopup