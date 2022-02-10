import React from "react";
import styled from "styled-components";
import TicTacToe from "./TicTacToe";
import "papercss/dist/paper.min.css";

function App() {
  return (
    <>
      <Title>Tic-Tac-Toe Game</Title>
      <Main>
      <TicTacToe />
      </Main>
      <Footer>
        <FooterInner>
          Built by{" "}
          <a href="https://nedumdev.netlify.app/">Nedu'm</a>
        </FooterInner>
      </Footer>
    </>
  );
}

const Title = styled.h3`
  display: flex;
  justify-content: center;
  height: 0vh;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  `;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  width: 100%;
  flex: 0 0 auto;
`;

const FooterInner = styled.h5`
  padding: 16px 0;
`;

export default App;