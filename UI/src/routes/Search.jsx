import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import { useSearchParams, useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { searchMovie, searchPerson, searchTvShows } from '../store';
import SearchResult from '../components/SearchResult';
import { getGenres } from '../store';

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const resultArray = ['Movie', 'Tv Shows', 'People']
    const dispatch = useDispatch();
    const search = useSelector((state) => state.search);
    const isGenresLoaded = useSelector((state) => state.getGenresLoaded);
    const result = resultArray.map((e,i)=>{
        return (search[i] && isGenresLoaded)
            ?
            <div className='flex searchBox j-center'>
                <SearchResult list={search[i]} type={e}></SearchResult>
            </div>
            :<div className='flex searchBox j-center'>
                <div className='flex text'> Cannot find {e} for '{searchParams.get("querry")}'...</div>
            </div>
        
    })
    useEffect(()=>{
        dispatch(getGenres({type: 'movie'}))
    },[])
    useEffect(()=>{
        if (isGenresLoaded) 
            dispatch(searchMovie({querry: `${searchParams.get("querry")}`}))
            dispatch(searchTvShows({querry: `${searchParams.get("querry")}`}))
            dispatch(searchPerson({querry: `${searchParams.get("querry")}`}))
    },[searchParams.get("querry"), isGenresLoaded])
    return <Container>
        {isGenresLoaded
            ?<>
            <NavBar Blur={false}/>
            <div className='content'>  
                <div className='flex text'> Searching for '{searchParams.get("querry")}'...</div>
                <div className='flex j-between'>
                    {result}
                </div >
            </div>
            </>
            :<></>
        }
    </Container>
}

const Container = styled.div`
    color: black;
    .text{
        color: #ffffff;
        font-size: 1.5rem;
        justify-content: center;
        margin-bottom: 2rem;
    }
    .content{
        padding: 10rem 3rem;
    }
    .searchBox{
        background-color: rgba(180, 175, 175, 0.438);
        border-radius: 10px;
        width: 30vw;
    }
`
