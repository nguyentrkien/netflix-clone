import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import { firebaseAuth } from '../ultis/firebase-config'
import {signOut, onAuthStateChanged} from "firebase/auth"
import {FaSearch, FaPowerOff} from 'react-icons/fa'

export default function NavBar({Blur,tab}) {
    const [showSearch,setShowSearch] = useState(false);
    const [inputHover,setInputHover] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const navbar = useRef();
    const navigate = useNavigate();
    const Links = [
        {name: 'Home', link: '/'},
        {name: 'TV Shows', link: '/tvshows'},
        {name: 'Movies', link: '/movies'},
        {name: 'My List', link: '/mylist'},
    ]
    const NavItem = Links.map(({name, link})=>
        <li key={name}>
            <Link to={link} className={`link ${(tab==name)?'selected':''}`}>{name}</Link>
        </li>
    )
    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(!currentUser) navigate("/login")
    })
    const handleScroll = () => {
        if (window.scrollY > 0 && navbar.current){
            navbar.current.style.backgroundColor = 'black';
            navbar.current.style.transition = '0.5s ease-in-out';
        }
        else if ((window.scrollY == 0) && navbar.current){
            navbar.current.style.backgroundColor = 'transparent';
            navbar.current.style.transition = '0.5s ease-in-out';
        }
    }
    window.addEventListener('scroll', handleScroll);
    return <Container>
        <div className={Blur?`blackBack`:``}></div>
            <div className='navbar flex j-between a-center' ref={navbar}>
                <div className='flex'>
                    <img className='logo' src={Logo} alt='logo' onClick={()=>{navigate('/')}}></img>
                    <ul className='navItem flex a-center j-between'>{NavItem}</ul>
                </div>
                <div className='right flex a-center j-between'>
                    <div className={`search ${showSearch ? "show-search" : ""}`}>
                        <button
                            onFocus={() => setShowSearch(true)}
                            onBlur={() => {
                                if (!inputHover) {
                                setShowSearch(false);
                                }
                            }}
                            >
                            <FaSearch />
                        </button>
                        <input
                            type="text"
                            placeholder="Search..."
                            onMouseEnter={() => setInputHover(true)}
                            onMouseLeave={() => setInputHover(false)}
                            onBlur={() => {
                                setShowSearch(false);
                                setInputHover(false);
                            }}
                            onChange={(e)=>{setSearchValue(`${e.target.value}`)}}
                            onKeyDown={e => {
                                if ((e.key === 'Enter') && (searchValue !='') ) {
                                    e.target.value = ''
                                    setSearchValue('')
                                    navigate(`/search?querry=${searchValue}`)
                                }
                              }}
                        />
                    </div>
                    <button onClick={() => signOut(firebaseAuth)}>
                        <FaPowerOff />
                    </button>
                </div>
            </div>
        
    </Container>
}

const Container = styled.div`
    .link{
    text-decoration: none;
    color: white;
    font-size: 20px;
    padding: 0.5rem 1rem;
    }
    .blackBack{
        position: absolute;
        z-index: 2;
    }
    .navbar{
        width: 100vw;
        position: fixed;
        z-index: 5;
        padding: 1rem 2rem;
        
    }
    .selected{
        background-color: #96919175;
        border-radius: 5px;
    }
    .navItem{
        margin: 0 2rem;
        min-width: 25rem;
        padding-inline-start: 0;
        list-style-type: none;
    }
    .logo{
            width: 10rem;
            cursor: pointer;
            height: auto;
        } 
    
    .right{
        font-size: 20px;
        margin: 0 2rem;
        padding-inline-start: 0;
        list-style-type: none;
        button{
            background-color: transparent;
            border: none;
            cursor: pointer;
            &:focus {
                outline: none;
            }
            svg {
                color: #f34242;
                font-size: 1.2rem;
            }
        }
    }
    .search{
        gap: 0.4rem;
        padding: 0.2rem;
        padding-left: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
    }
    .show-search{
        border: 1px solid white;
        background-color: rgba(0,0,0,0.6);
        input{
            width: 100%;
            opacity: 1;
            visibility: visible;
            padding: 0.3rem;
        }
    }
`
