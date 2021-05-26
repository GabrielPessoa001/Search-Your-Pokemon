import { useState, useEffect } from "react"

import { useRouter } from 'next/router'
import Image from 'next/image'

import axios from "axios"

import Loading from '../Loading';

import {
  Container,
  CardPokemon,
  TitleAndImage,
  Title,
  PokemonType,
  TitleType
} from "./style"

function UniquePokemon () {
  const [ pokemon = [], setPokemon ] = useState([])
  const [ imageUrl, setImageUrl ] = useState('')

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    async function getPokemon () {
      try {
        const URL_POKEMON = `https://pokeapi.co/api/v2/pokemon/${ id }/`

        let response = await axios.get(URL_POKEMON)

        setPokemon(response.data)
        setImageUrl(response.data.sprites.front_default)
      } catch (e) {
        console.log(`Erro: ${ e }`)
      }
    }

    getPokemon()
  }, [id])

  return (
    <Container>
      <CardPokemon>
        <TitleAndImage>
          <Title>{ pokemon.name }</Title>

          <img src={ imageUrl } width="100" />
        </TitleAndImage>

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
      </CardPokemon>
    </Container>
  )
}

export default UniquePokemon
