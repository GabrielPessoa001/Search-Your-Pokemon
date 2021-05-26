import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100%;
  height: 70vh;
`;

export const CardPokemon = styled.div`
  padding: 25px 0;

  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.4) !important;
  border-radius: 5px;

  width: 30%;
`;

export const TitleAndImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

export const Title = styled.h1`
  margin: 0 !important;
`;

export const PokemonType = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  width: 100%;
`;

export const TitleType = styled.h3`
  margin: 0;
`;

export const PokemonLocated = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  margin-top: 15px;
`;

export const TitleLocated = styled.h5`
  margin: 0;
`;
