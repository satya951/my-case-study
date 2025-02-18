import React, { useState } from "react";
import "./App.css";
import rockImg from "./assets/rock.png";
import paperImg from "./assets/paper.png";
import scissorsImg from "./assets/scissors.png";

const choices = [
  { name: "rock", img: rockImg },
  { name: "paper", img: paperImg },
  { name: "scissors", img: scissorsImg },
];

function App() {
  const [player1Choice, setPlayer1Choice] = useState(null);
  const [player2Choice, setPlayer2Choice] = useState(null);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isMultiplayer, setIsMultiplayer] = useState(false);

  const getRandomChoice = () => choices[Math.floor(Math.random() * choices.length)];

  const determineWinner = (choice1, choice2) => {
    if (choice1.name === choice2.name) return "It's a Tie!";
    if (
      (choice1.name === "rock" && choice2.name === "scissors") ||
      (choice1.name === "scissors" && choice2.name === "paper") ||
      (choice1.name === "paper" && choice2.name === "rock")
    ) {
      return "Player 1 Wins!";
    }
    return "Player 2 Wins!";
  };

  const playGame = (choice) => {
    setPlayer1Choice(choice);
    const opponentChoice = isMultiplayer ? null : getRandomChoice();
    setPlayer2Choice(opponentChoice);
    if (!isMultiplayer) setWinner(determineWinner(choice, opponentChoice));
  };

  const handlePlayer2Choice = (choice) => {
    setPlayer2Choice(choice);
    setWinner(determineWinner(player1Choice, choice));
  };

  const startGame = () => {
    setGameStarted(true);
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setWinner(null);
  };

  return (
    <div className="game-container">
      {!gameStarted ? (
        <div>
          <h1>Rock Paper Scissors</h1>
          <button onClick={() => setIsMultiplayer(false)}>Play vs Computer</button>
          <button onClick={() => setIsMultiplayer(true)}>Play with Friend</button>
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <div>
          <h1>Make Your Choice</h1>
          <div className="choices">
            {choices.map((choice) => (
              <button key={choice.name} onClick={() => playGame(choice)}>
                <img src={choice.img} alt={choice.name} />
              </button>
            ))}
          </div>
          {isMultiplayer && player1Choice && !player2Choice && (
            <div>
              <h2>Player 2, Make Your Choice</h2>
              <div className="choices">
                {choices.map((choice) => (
                  <button key={choice.name} onClick={() => handlePlayer2Choice(choice)}>
                    <img src={choice.img} alt={choice.name} />
                  </button>
                ))}
              </div>
            </div>
          )}
          {winner && (
            <div>
              <h2>{winner}</h2>
              <button onClick={startGame}>Restart Game</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
