import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import Tag from '../components/Tag'
import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from 'react-icons/md'

export default function TagSlide({movies, title}) {
    const [focus,setFocus] = useState(false);
    const [slideCount,setSlideCount] = useState(0);
    const list = useRef();
    const handleClick = (direction) =>{
        let distance = list.current.getBoundingClientRect().x-24;
        if((direction=='left')&&(slideCount>0)){
            list.current.style.transform = `translateX(${220+distance}px)`;
            setSlideCount(slideCount-1);
        }
        if((direction=='right')&&(slideCount<(movies.length-6))){
            list.current.style.transform = `translateX(${-220+distance}px)`;
            setSlideCount(slideCount+1);
        }

    }
    return (
        <Container     
            onMouseEnter={()=>{setFocus(true)}}
            onMouseLeave={()=>{setFocus(false)}}>
        <div className='title'>{title}</div>
        <div className='flex tags'>
            {focus?<button className='btn left' onClick={()=>{handleClick('left')}}> <MdOutlineKeyboardArrowLeft/> </button>:<></>}
            <div 
                className='slide flex tags' 
                ref={list} >
                {
                    movies.map((movie,index)=>
                    <Tag className='' movie={movie} key={index}></Tag>            
                    )
                }
            </div>
            {focus?<button className='btn right' onClick={()=>{handleClick('right')}}> <MdOutlineKeyboardArrowRight/> </button>:<></>}
        </div>
        </Container>
    )
}

const Container = styled.div`
    padding: 2rem 1.5rem;
    .tags{
        justify-content: flex-start;
        position: relative;
        .btn{
            position: absolute;
            z-index: 2;
            background-color: transparent;
            border: none;
            color: white;
            font-size: 3rem;
            cursor: pointer;
            top: 30%;
            
        }
        .right{
            left: 92vw;
        }
        .left{
            left: -2vw;
        }
        .slide{
            transition: 0.2s ease-in-out;
        }
    }
    .title{
        font-weight: 700;
        font-size: 1.5rem;
        margin: 1rem 0;
        padding: 0 1rem;
    }

`
