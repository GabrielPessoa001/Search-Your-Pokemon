import Link from "next/link"

import {
  Container,
  Title,
  TitleLink,
  AgroupLinks
} from './style';

function Navbar () {
  return (
    <Container>
      <AgroupLinks>
        <Link href="/">
          <TitleLink>home</TitleLink>
        </Link>

        <Title>Pokémon</Title>

        <Link href="/random">
          <TitleLink>aleatório</TitleLink>
        </Link>
      </AgroupLinks>
    </Container>
  )
}

export default Navbar
