import React from 'react'
import Logo from '../assets/logo.png'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

export default function Header({login}) {
    const navigate = useNavigate();
    return (
        <Container>
            <div className='header flex j-between'>
                    <img className='logo' src={Logo} alt='logo'></img>
                    <button className='btn' onClick={()=> navigate(login?"/Login":"/Signup")}>
                    {login ? "Log In":"Sign In"}
                    </button>
            </div>
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    width: 100vw;
    padding: 2rem;
    .logo{
        width: 10rem;
        cursor: pointer;
        height: auto;
    }
    .btn{
        font-size: 16px;
        border: none;
        border-radius: 5px;
        background-color: red;
        color: white;
        font-weight: bold;
        padding: 0 20px;
        cursor: pointer;
        max-height: 40px;
    }
`;
