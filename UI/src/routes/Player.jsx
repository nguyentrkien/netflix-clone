import React from 'react'
import styled from 'styled-components'
import {BiLeftArrowAlt} from 'react-icons/bi'
import videoTrailer from '../assets/videoTrailer.mp4'
import { useNavigate } from 'react-router-dom'

export default function Player() {
    const navigate = useNavigate();
    return <Container>
        <button onClick={()=>{navigate(-1)}}>
            <BiLeftArrowAlt className='back'/>
        </button>
        <video src={videoTrailer} autoPlay muted controls loop/>
    </Container>
}

const Container = styled.div`
    background-color: black;
    button{
        position: fixed;
        z-index: 2;
        background-color: transparent;
        border: none;
        margin: 1rem 0 0 1rem;
        cursor: pointer;
        .back{
            font-size: 50px;
            color: white;
        }
    }
    video{
        width: 100vw;
        height: 100vh;
    }
`