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
  const [ data, setData ] = useState('')

  const [ conf, setConf ] = useState('')

  const [ urlPokemon, setUrlPokemon ] = useState('https://pokeapi.co/api/v2/pokemon')

  useEffect(() => {
    async function searchPokemons () {  
      let response;
      
      try {
        response = await axios.get(urlPokemon);
        
        setData(response.data)
        setPokemons(response.data.results)
      } catch (e) {
        errorState
  
        console.log(`Erro encontrado: ${ e }`)
      }
    }

    searchPokemons()
  }, [])

  async function newRequest (url) {
    let response;
    
    try {
      response = await axios.get(url);

      setData(response.data)
      setPokemons(response.data.results)
    } catch (e) {
      errorState

      console.log(`Erro encontrado: ${ e }`)
    }
  }

  function nextUrl () { newRequest(data.next) }
  function previousUrl () { newRequest(data.previous) }

  function cleanState () {
    setConf('')
    setQuery('')
  }

  function errorState () {
    cleanState()
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
              <Button onClick={ cleanState }>Limpar</Button>
            </GroupButtons>

            <GroupButtons>
            <Button onClick={ previousUrl }>PREVIOUS</Button>
              <Button onClick={ nextUrl }>NEXT</Button>
            </GroupButtons>
          </MyForm>

          <GroupCards>
            {
              pokemons.map((p, index) => (
                <Link key={ p.name } href={ `/pokemon/${ index + 1 }` }>
                  <Card>
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
