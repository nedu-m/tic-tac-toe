import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { DIMS, PLAYER_X, PLAYER_O, SQUARE_DIMS, GAME_STATES } from "./constants";
import { getRandomInt, switchPlayer } from "./utils";
import Board from "./Board";

const arr = new Array(DIMS ** 2).fill(null);

const board = new Board();

const TicTacToe = () => {
  const [grid, setGrid] = useState(arr);
  const [players, setPlayers] = useState({
    human: null,
    computer: null
  });
  const [gameState, setGameState] = useState(
    GAME_STATES.notStarted);

  const choosePlayer = option => {
    setPlayers({ human: option, computer: switchPlayer(option) });
    setGameState(GAME_STATES.inProgress);
    setNextMove(PLAYER_X);
  };

  const move = useCallback(
      (index, player) => {
        if (player && gameState === GAME_STATES.inProgress) {
          setGrid(grid => {
            const gridCopy = grid.concat();
            gridCopy[index] = player;
            return gridCopy;
          });
        }
      },
      [gameState]
    );

  const computerMove = useCallback(() => {
    let index = getRandomInt(0, 8);
    while (grid[index]) {
      index = getRandomInt(0, 8);
    }
    move(index, players.computer);
    setNextMove(players.human);
  }, [move, grid, players]);

  const humanMove = index => {
    if (!grid[index] && nextMove === players.human) {
      move(index, players.human);
      setNextMove(players.computer);
    }
  };

  const [nextMove, setNextMove] = useState(null);

  const [winner, setWinner] = useState(null);

  useEffect(() => {
    let timeout;
    if (
      nextMove !== null &&
      nextMove === players.computer &&
      gameState !== GAME_STATES.over
    ) {
      //Delay computer moves to make them appear natural
      timeout = setTimeout(() => {
        computerMove();
      }, 500);
    }
    return () => timeout && clearTimeout(timeout);
  }, [nextMove, computerMove, players.computer, gameState]);


  return gameState === GAME_STATES.notStarted ? (
    <Screen>
      <Inner>
        <ChooseText>Choose your player</ChooseText>
        <ButtonRow>
          <button onClick={() => choosePlayer(PLAYER_X)}>X</button>
          <p>or</p>
          <button onClick={() => choosePlayer(PLAYER_O)}>O</button>
        </ButtonRow>
      </Inner>
    </Screen>
  ) : (
    <Container dims={DIMS}>
      {grid.map((value, index) => {
        const isActive = value !== null;

      return (
        <Square
          key={index}
          onClick={() => humanMove(index)}
        >
          {isActive && <Marker>{value === PLAYER_X ? "X" : "O"}</Marker>}
        </Square>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: ${({ dims }) => `${dims * (SQUARE_DIMS + 5)}px`};
  flex-flow: wrap;
  position: relative;
`;

const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${SQUARE_DIMS}px;
  height: ${SQUARE_DIMS}px;
  border: 1px solid black;

  &:hover {
    cursor: pointer;
  }
`;

const Marker = styled.p`
  font-size: 68px;
`;

const ButtonRow = styled.div`
  display: flex;
  width: 150px;
  justify-content: space-between;
`;

const Screen = styled.div``;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const ChooseText = styled.p``;

export default TicTacToe;