import { useState } from "react"
import GameBoard from "./components/GameBoard.jsx"
import Header from "./components/Header.jsx"
import PlayerInfo from "./components/PlayerInfo.jsx"
import Log from "./components/Log.jsx"
import { WINNING_COMBINATIONS } from "./components/winning-combination.js"
import GameOver from "./components/GameOver.jsx"
import { use } from "react"


const PLAYERS = {
   X: 'Player 1',
   O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
        [null,null,null],
        [null,null,null],
        [null,null,null]
        ];


function derivedActivePlayer(gameTurns){

  let currentPlayer = 'X';

      if(gameTurns.length > 0 &&  gameTurns[0].player ==='X'){
        currentPlayer ='O';
      }
      return currentPlayer;
}

function derivedWinner(gameBoard, players){
let winner;

for (const combination of WINNING_COMBINATIONS) {
  const firstSquareSymbol  = gameBoard[combination[0].row][combination[0].column];
  const secondSquareSymbol  = gameBoard[combination[1].row][combination[1].column];
  const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

  if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
    winner = players[firstSquareSymbol];
  }
}
return winner;
}

function derivedGameBoard(gameTurns){

  let gameBoard = [...INITIAL_GAME_BOARD.map((array)=> [...array])];

    for(const turn of gameTurns){
        const {square, player} = turn;
        const {row,col } = square;
        gameBoard[row][col] = player;
    }

    return gameBoard;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns,setGameTurns]= useState([]);

  const [players,setPlayers] = useState(PLAYERS);


 const activePlayer = derivedActivePlayer(gameTurns);
 const gameBoard =derivedGameBoard(gameTurns);
 let winner = derivedWinner(gameBoard,players);
 const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex,colIndex){
    // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X');

    setGameTurns(prevTurns =>{
    
      const currentPlayer = derivedActivePlayer(prevTurns);
    
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer},
         ...prevTurns
        ];
        return updatedTurns;
    });
  }
  function handleRematch(){
    setGameTurns([]);
  }

  function handlePlayerChange(symbol,newName){

    setPlayers(prevPlayers =>{
      return {
        ...prevPlayers, [symbol]: newName
      };
    });
  }

  return (
    
<main>
 <Header/>
 
 <div id="game-container">

  <ol id="players" className="highlight-player">
<PlayerInfo name={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName = {handlePlayerChange}/>
<PlayerInfo name={PLAYERS.O} symbol="O" isActive={activePlayer === 'O' } onChangeName = {handlePlayerChange}/>
  </ol>
{(winner || hasDraw) && <GameOver winner = {winner} onRestart={handleRematch}/> }

<GameBoard  onSelectSquare = {handleSelectSquare} board={gameBoard} />  
 </div>
 <Log turns={gameTurns}/>
</main>
  )
}

export default App
