import React from 'react'
import styled from 'styled-components'
import { BsDot } from 'react-icons/bs'
import NotFoundImage from '../assets/NotFound.png'

export const SearchResultElement = ({item, type}) => {
  return <Container>
    {type != 'People'
        ?<div className='flex a-center'>
            <div className='img'>
                <img src={(item.image)?`https://image.tmdb.org/t/p/w500/${item.image}`:NotFoundImage} alt="poster"/>
            </div>
            <div className='flex column info'>
                <div className="name">{item.name}</div>
                <div>
                    <div className="rating" style={(item.rating>=5)?{color: '#7cd67c'}:{color: '#c9415e'}}>Ratings: {item.rating}</div>
                    <div className="release_date">Release Date: {item.release_date}</div>
                    <div className="genres flex a-center">
                        <div style={{marginRight: '0.4rem'}}>Genres:</div>
                        {
                            item.genres.map((e,i)=>
                            <div key={i} className="flex a-center">
                                <div key={i}>{e.name}</div>
                                    {  
                                    ((i+1)!=item.genres.length)
                                    ?<BsDot key={e.name}/> 
                                    :<></>
                                    }
                            </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
        :<div className='flex a-center'> 
            <div className='img'>
                <img src={`https://image.tmdb.org/t/p/w500/${item.image}`} alt="poster"/>
            </div>
            <div className='flex column info'>
                <div className="name">{item.name}</div>
                <div>
                    <div className="Popularity" style={{color: '#7cd67c'}}>Popularity: {item.popularity}</div>
                    <div className="gender">Gender: {item.gender==2?"Male":"Female"}</div>
                    <div className="department">Department: {item.knowForDepartment}</div>
                    <div className="knowfor flex a-center">
                        <div style={{marginRight: '0.4rem'}}>Know For:</div>
                        {
                            item.knowFor.map((e,i)=>
                            <div key={i} className="flex a-center">
                                <div key={i}>{e}</div>
                                    {  
                                    ((i+1)!=item.knowFor.length)
                                    ?<BsDot key={e}/> 
                                    :<></>
                                    }
                            </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    }
    </Container>
}

const Container = styled.div`
    :hover{
        opacity: 0.6;
    }
    margin-top: 1rem;
    cursor: pointer;
    background-color: black;
    border-radius: 10px;
    padding: 1rem;
    .img{
        width: 20%;
        height: 20%;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .info{
        margin: 0 1rem;
        justify-content: space-evenly;
    }
    .name{
        font-size: 1.5rem;
        font-weight: bold;
    }
    .rating,.Popularity,.gender,.knowfor,.release_date,.genres,.department{
        font-weight: 400px;
        font-size: 0.7rem;
    }
    .knowfor{
        flex-wrap: wrap;
        font-style: italic;
        color: #c97171
    }
`
