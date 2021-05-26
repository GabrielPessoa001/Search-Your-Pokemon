import React, { useState, useEffect } from 'react';

import Loading from '../Loading';

import axios from 'axios';

import Link from "next/link"

import {
  Container,
  Input, 
  Card, 
  GroupCards,
  DataCard,
  MyForm,
  GroupButtons,
  Button
} from './style';

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
      {
        pokemons.length > 0
        ?
        <>
          <MyForm>
            <Input placeholder="Busca por nome" value={ query } onChange={ e => setQuery(e.target.value) } />

            <GroupButtons>
              <Button>Buscar</Button>
              <Button>Limpar</Button>
            </GroupButtons>
          </MyForm>

          <GroupCards>
            {
              pokemons.map((p, index) => (
                <Link href={ `/pokemon/${ index + 1 }` }>
                  <Card key={ p.name }>
                    <img src={ `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ index + 1 }.png` } />

                    <DataCard>{ p.name }</DataCard>
                  </Card>
                </Link>
              ))
            }
          </GroupCards>
        </>
        :
        <Loading />
      }

    </Container>
  )
}

export default Pokemon
