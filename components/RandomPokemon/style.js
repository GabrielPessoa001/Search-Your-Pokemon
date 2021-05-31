import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

export const Button = styled.button`
  margin-top: 20px;
`;

export const Text = styled.h5`
  color: black;

  margin: 5px !important;
`;

export const Card = styled.div`
  margin: 12px;

  width: 30%;

  text-align: center;
  align-items: center;

  padding: 10px 0px;

  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.4) !important;
  border-radius: 5px;
`;

export const PokemonType = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  height: 10vh;

  width: 100%;
`;

export const TitleType = styled.h3`
  margin: 0;
`;

export const PokemonLocated = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  height: 10vh;
  overflow: auto;
`;

export const TitleLocated = styled.h5`
  margin: 0;
`;
