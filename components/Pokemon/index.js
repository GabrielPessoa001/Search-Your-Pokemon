import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Container,
         Input, 
         Label, 
         Card, 
         GroupCards,
         DataCard,
         MyForm,
         NoneDiv } from './style';

const Pokemon = () => {
  const [ pokemons = [], setPokemons ] = useState([])
  const [ query, setQuery ] = useState('')
  const [ conf, setConf ] = useState('')

  useEffect(() => {
    async function searchPokemons () {
      const URL_POKEMON = `https://pokeapi.co/api/v2/pokemon?limit=898`;
  
      let response;
      
      try {
        response = await axios.get(URL_POKEMON);
  
        console.log(response)

        setPokemons(response.data.results)
      } catch (e) {
        errorState
  
        console.log(`Erro encontrado: ${ e }`)
      }
    }

    searchPokemons()
  }, [])

  async function pokemonImage (URL) {
    let response;

    try {
      response = await axios.get(URL)

      console.log(response)
    } catch (e) {
      console.log(`Erro encontrado: ${ e }`)
    }
  }

  function cleanState () {
    setConf('')
    setQuery('')
  }

  function errorState () {
    cleanState

    setConf('Not found')
  }

  return (
    <Container>
      <MyForm>
        <Label>
          Pesquisar por nome <Input value={ query } onChange={ e => setQuery(e.target.value) } />
        </Label>
        
        <br/>
      </MyForm>

      <GroupCards>
        {
          pokemons
          ?
          pokemons.map((p, index) => (
            <Card key={ p.name }>
              <img src={ `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ index + 1 }.png` } />

              <DataCard>{ p.name } { index }</DataCard>
            </Card>
          ))
          :
          <NoneDiv> NADA </NoneDiv>
        }
      </GroupCards>
    </Container>
  )
}

export default Pokemon
