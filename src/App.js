import React from 'react';
import './App.css';

import moment from 'moment';
import axios from 'axios';
import {useEffect, useState} from 'react'

import {Redirect, Router, Route} from "react-router-dom";

import PersonPopup from './components/PersonPopup/PersonPopup.js';

function App() {

  const [characters, setCharacters] = useState([])
  let [query, setQuery] = useState("")
  let [genderQuery, setGenderQuery] = useState("")
  let [status, setStatus] = useState("")

  const [popupActive, setPopupActive] = useState(false)
  const [characterID, setCharacterID]= useState("")

  const [value, setValue] = useState(1)
   
  const testName = "TEST"
  const temp = 1

  const link = "https://rickandmortyapi.com/api/character/"

  useEffect(() => {
    const fetchData = async () => {
        try {
            const {data} = await axios.get(`https://rickandmortyapi.com/api/character/?&${selectedRadio}=${query}`)
            setCharacters(data.results)
        } catch (error) {
            console.error(error)
        }
    }

    fetchData()
  }, [query])

  const changeCharacterID = (temp) => {
    setCharacterID(temp)
    console.log("~~~~~~~~~~~~~~ ID: ", characterID)

  }

  

  const [selectedRadio, setSelectedRadio] = useState('name')

  const isRadioSelected = (value) => selectedRadio === value;
  const handleRadioClick = (e) => setSelectedRadio(e.target.value);


  return (
    <div className="App">

      <div className="search">
        <input 
          type="text" 
          placeholder={"Search Rick and Morty characters"} 
          className={"input"}
          onChange={event => setQuery(event.target.value)}
          value={query}
        />
      </div>

      <div className="checkbox">Search by:
        <input
          type="radio"
          name="select-radio"
          value="name"
          checked={isRadioSelected("name")}
          onChange={handleRadioClick}
        />Name 

        <input
          type="radio"
          name="select-radio"
          value="species"
          checked={isRadioSelected("species")}
          onChange={handleRadioClick}
        />Species

        <input
          type="radio"
          name="select-radio"
          value="gender"
          checked={isRadioSelected("gender")}
          onChange={handleRadioClick}
        />Gender

        <input
          type="radio"
          name="select-radio"
          value="location"
          checked={isRadioSelected("location")}
          onChange={handleRadioClick}
        />Location

        <input
          type="radio"
          name="select-radio"
          value="status"
          checked={isRadioSelected("status")}
          onChange={handleRadioClick}
        />Status
      </div>

      <div className="results">
        {characters.map(character => (
          <div>
            
          <a onClick={() => {setPopupActive(true); changeCharacterID(character.id)}}>
            <img className="character_image" src={character.image} alt={character.name}></img>
          </a>
            <div className="character_name">{character.name}</div> 
            <div className="character_description">
              {character.species} <br/>
              {character.gender} <br/>
              {character.type} <br/>
              {character.location.name} <br/>
              {moment(character.created).format('MMMM Do, YYYY')} <br/>

            </div>
            
          </div>
        ))}

      </div>

      <PersonPopup active={popupActive} setActive={setPopupActive} characterID={characterID}/>
      
      
    </div>
  );
  
}

export default App;
