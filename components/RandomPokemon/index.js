import { useState, useEffect } from "react"

import axios from 'axios';

import Loading from "../Loading"

import {
  Container,
  Button,
  Text,
  Card,
  PokemonType,
  TitleType,
  PokemonLocated,
  TitleLocated
} from "./style"

function RandomPokemon () {
  const [ pokemon = [], setPokemon ] = useState([])
  const [ locatedIn = [], setLocatedIn ] = useState([])

  useEffect(() => {
    async function searchPokemon () {
      try {
        let id = randomNumber()

        const URL_POKEMON = `https://pokeapi.co/api/v2/pokemon/${ id }/`
        const URL_LOCATED = `https://pokeapi.co/api/v2/pokemon/${ id }/encounters`
  
        let response = await axios.get(URL_POKEMON)
        let response_located = await axios.get(URL_LOCATED)

        setPokemon(response.data)
        setLocatedIn(response_located.data.length > 0 ? response_located.data :  [{ location_area: { name: "Evolução de um Pokémon" } }] )
      } catch (e) {
        console.log(`Erro: ${ e }`)
      }
    }

    searchPokemon()
  }, [])

  async function newRequest () {
    try {
      let id = randomNumber()

      const URL_POKEMON = `https://pokeapi.co/api/v2/pokemon/${ id }/`

      let response

      response = await axios.get(URL_POKEMON)

      setPokemon(response.data)
    } catch (e) {
      console.log(`Erro: ${ e }`)
    }
  }

  function randomNumber () { return Math.floor(Math.random() * 899) }

  return (
    <Container>
      {
        pokemon !== 'undefined'
        ?
        <>
          <Card>
            <img src={ `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ pokemon.id }.png` } />

            <Text>{ pokemon.name }</Text>

            <PokemonType>
              {
                pokemon.types
                ?
                pokemon.types.map((c, index) => (
                  <TitleType key={ index }>{ c.type.name }</TitleType>
                ))
                :
                <Loading />
              }
            </PokemonType>

            <PokemonLocated>
              {
                locatedIn.length > 0
                ?
                <>
                  <TitleLocated>Localizado em: </TitleLocated>

                  {
                    locatedIn.map((c, index) => (
                      <TitleLocated key={ index }>{ c.location_area.name }</TitleLocated>
                    ))
                  }
                </>
                :
                <TitleLocated>Loading...</TitleLocated>
              }
            </PokemonLocated>
          </Card>

          <Button onClick={ newRequest }>Novo Pokémon</Button>
        </>
        :
        <Loading />
      }
    </Container>
  )
}

export default RandomPokemon
