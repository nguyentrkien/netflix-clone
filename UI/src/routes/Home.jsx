import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import home from '../assets/home.jpg'
import hometitle from '../assets/homeTitle.webp'
import SildeBar from '../components/SildeBar'
import {FaPlay} from 'react-icons/fa'
import {GoInfo} from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, getTrendingMovie } from '../store'

export default React.memo(function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isGenresLoaded = useSelector((state) => state.getGenresLoaded);
    const movies = useSelector((state) => state.movies);
    
    useEffect(()=>{
        window.scrollTo(0, 0)
        dispatch(getGenres({type: 'movie'}))
    },[])
    useEffect(()=>{
        if (isGenresLoaded)
            dispatch(getTrendingMovie())
    },[isGenresLoaded])

    return <Container>
        <NavBar Blur={true} tab={'Home'}/>
        <div className='flex hometitleImage column homeTitle j-evenly'>
            <img className=''src={hometitle} alt=''></img>
            <div className='btn flex j-between'>
                <button className='play flex a-center' onClick={()=>{navigate('/Player')}}>
                    <FaPlay className='icon'/>
                    Play
                </button>
                <button className='info flex a-center'>
                    <GoInfo className='icon'/>
                    More Info
                </button>
            </div>
        </div>
        <img className='homeImage'src={home} alt=''></img>

        <SildeBar movies={movies}/>
    
    </Container>
})

const Container = styled.div`
    .homeImage{
        position: relative;
        width: 100vw;
        height: 100vh;
    }
    .homeTitle{
        height: 100%;
        position: absolute;
        z-index: 2;
        padding: 6rem 0 0 3.2rem;
        opacity: 0.9;
    }
    .btn{
        max-width: 25rem;
        button{
            font-size: 20px;
            padding: 0.5rem 2rem;
            border: none;
            cursor: pointer;
        }
        .icon{
            margin: 0 0.3rem;
        }
        .play{
            border-radius: 3px;
        }
        .info{
            background-color: rgba(1,1,1,0.5);
            border-radius: 3px;
            color: white
        }
    }
`