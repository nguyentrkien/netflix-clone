import React, { useEffect, useState} from 'react'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import SildeBar from '../components/SildeBar'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, getDatabyGenres } from '../store'

export default React.memo(function Movies() {
    const dispatch = useDispatch();
    const isGenresLoaded = useSelector((state) => state.getGenresLoaded);
    const movies = useSelector((state) => state.movies);
    const genres = useSelector((state) => state.getGenres);
    const [genre,setGenre] = useState('Action')
    const genresOption = genres.map((element, i)=>{
        if (i == 0)
            return <option value={element.name} key={element.id} selected>{element.name}</option>
        else 
            return <option value={element.name} key={element.id} >{element.name}</option>
    })
    useEffect(()=>{
        window.scrollTo(0, 0)
        dispatch(getGenres({type: 'movie'}))
    },[])
    useEffect(()=>{
        if (isGenresLoaded)
        dispatch(getDatabyGenres({genres: `28`, type: 'movie'}))
            
    },[isGenresLoaded])

    useEffect(()=>{
        // 
        const a = genres.find((e)=>{
            if (e.name == genre) 
                return e
        })
        if(a)
            dispatch(getDatabyGenres({genres: `${a.id}`, type: 'movie'}))
    }, [genre])

    return <Container>
        <NavBar blur={false} tab={'Movies'}/>
        <div className='content'>
            <select name='genres' id='genres' onChange={(e)=>{setGenre(`${e.target.value}`)}}>
                {genresOption}
            </select>
            <SildeBar movies={movies}/>
        </div>
    </Container>
})

const Container = styled.div`
    .content{
        padding-top: 10rem;
        #genres{
            border: 1px white solid;
            border-radius: 5px;
            margin: 2rem 2.5rem;
            padding: 0.5rem;
            font-weight: bold;
            background-color: transparent;
            color: white;
            option{
                color: black;
            }
        }

    }
`