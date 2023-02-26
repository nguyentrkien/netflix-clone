import React from 'react'
import styled from 'styled-components'
import backgroundImage from '../assets/login.jpg'

export default function Background() {
  return (
    <Container>
        <img src={backgroundImage} alt=''/>
    </Container>
    )
}

const Container = styled.div`
    position: fixed;
    z-index: -1;
    img{
        height: 100vh;
        width: 100vw;
    }
`;