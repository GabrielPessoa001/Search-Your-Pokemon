import { useState, useEffect } from "react"

import { useRouter } from 'next/router'

import axios from "axios"

import {
  Container
} from "./style"

function UniquePokemon () {
  const [ pokemon = [], setPokemon ] = useState([])

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    async function getPokemon () {
      try {
        const URL_POKEMON = `https://pokeapi.co/api/v2/pokemon/${ id }/`

        let response = await axios.get(URL_POKEMON)
  
        setPokemon(response.data)
      } catch (e) {
        console.log(`Erro: ${ e }`)
      }
    }

    getPokemon()
  }, [id])

  console.log(pokemon)

  return (
    <Container>
      <h4>
        { pokemon.name }
      </h4>
    </Container>
  )
}

export default UniquePokemon
