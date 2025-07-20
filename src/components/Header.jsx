import headerImg from "/game-logo.png";
export default function Header(){

    return (

        <header>
         <img src={headerImg} alt="game-logo"  />
          <h1>React Tic-Tac-Toe</h1>
        </header>
    );
}