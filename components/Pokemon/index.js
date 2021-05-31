import { useState, useEffect } from 'react';

import axios from 'axios';

import Link from "next/link"
import { useRouter } from 'next/router'

import Loading from '../Loading';

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

  const [ id, setId ] = useState(1)

  const Router = useRouter()

  useEffect(() => {
    async function searchPokemons () {
      const URL_POKEMON = `https://pokeapi.co/api/v2/pokemon`

      let response;
      
      try {
        response = await axios.get(URL_POKEMON);
        
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

  function nextUrl () {
    id + 20 > 898 ? setId(id) : setId(id+20)
    newRequest(data.next)
  }

  function previousUrl () {
    id - 20 < 0 ? setId(id) : setId(id-20)
    newRequest(data.previous)
  }

  function searchPokemon () { Router.replace(`/pokemon/${ query }`) }

  function cleanState () {
    setConf('')
    setQuery('')
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
              <Button onClick={ searchPokemon }>Buscar</Button>
              <Button onClick={ cleanState }>Limpar</Button>
            </GroupButtons>
          </MyForm>

          <GroupCards>
            {
              pokemons.map((p, index)=> (
                <Link key={ p.name } href={ `/pokemon/${ id + index }` }>
                  <Card>
                    <img src={ `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id + index }.png` } />

                    <DataCard>{ p.name }</DataCard>
                  </Card>
                </Link>
              ))
            }
          </GroupCards>

          <GroupButtons>
            <Button onClick={ previousUrl }> ◀ </Button>
            <Button onClick={ nextUrl }> ▶ </Button>
          </GroupButtons>
        </>
        :
        <Loading />
      }
    </Container>
  )
}

export default Pokemon
