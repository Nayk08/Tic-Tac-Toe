import { useState } from "react";

export default function PlayerInfo({name,symbol,isActive, onChangeName}){

    const [player, setPlayer] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    function handleNameChange(event){
 
        setPlayer(event.target.value);
       
    }


    function handleClick(){
        if(isEditing){
         onChangeName(symbol,player)
       }
       setIsEditing((editing) => !editing);
       
    }


    let playerName = <span className="player-name"> {player}</span>;
    // let btnCaption = 'edit';

    if(isEditing){ playerName = <input className="player-name" type="text"  onChange={handleNameChange}  value={player} /> }

    return(
     <>
     <li className={isActive ? 'active' : undefined}>
     <span className="player"> {playerName} </span>
     <span className="player-symbol"> {symbol}</span>

      <button  onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>

     </>
    );
}