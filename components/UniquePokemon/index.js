import {
  useState,
  useEffect
} from "react"

import { useRouter } from 'next/router'

import axios from "axios"

import Loading from '../Loading';

import {
  Container,
  CardPokemon,
  TitleAndImage,
  Title,
  PokemonType,
  TitleType,
  PokemonLocated,
  TitleLocated
} from "./style"

function UniquePokemon () {
  const [ pokemon = [], setPokemon ] = useState([])
  const [ locatedIn = [], setLocatedIn ] = useState([])
  const [ imageUrl, setImageUrl ] = useState('')

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    async function getPokemon () {
      try {
        const URL_POKEMON = `https://pokeapi.co/api/v2/pokemon/${ id }/`
        const URL_LOCATED = `https://pokeapi.co/api/v2/pokemon/${ id }/encounters`

        let response = await axios.get(URL_POKEMON)
        let response_located = await axios.get(URL_LOCATED)

        setPokemon(response.data)
        setLocatedIn(response_located.data.length > 0 ? response_located.data :  [{ location_area: { name: "Evolução de um Pokémon" } }] )
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
      </CardPokemon>
    </Container>
  )
}

export default UniquePokemon
