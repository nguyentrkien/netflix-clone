import React from 'react'
import styled from 'styled-components'
import { SearchResultElement } from './SearchResultElement'

export default function SearchResult({list, type}) {
    const getItem = (start,end) =>{
        return list.slice(start,end)
    }
    const searchElement = getItem(0,4).map((e,i)=>{
        return <SearchResultElement item={e} key={i} type={type}/>
    })
    return <Container>
        <div className='flex column'>
            <div className='flex header'> {type} </div>
            {searchElement}
        </div>
    </Container>
}

const Container = styled.div`
    color: #ffffff;
    margin: 1rem 1rem;
    
    .header{
        color: #ffffff;
        font-size: 1.2rem;
        justify-content: center;
        font-weight: bold;
    }
    .tag{
        margin-top: 2rem;
        cursor: pointer;
        background-color: black;
        border-radius: 10px;
        padding: 1rem;
        img{
            width: 30%;
            height: 30%;
        }
        .info{
            margin: 0 1rem;
        }
        .rating,.release_date,.genres{
            font-weight: bold;
            font-size: 0.8rem;
        }
        .rating{
            color: #7cd67c;
        }
    }
    .tag:hover{
        opacity: 0.6;
    }
`
