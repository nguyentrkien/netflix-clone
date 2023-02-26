import React,{useEffect, useState} from 'react'
import {onAuthStateChanged} from "firebase/auth"
import { firebaseAuth } from '../ultis/firebase-config'
import axios from 'axios'
import styled from 'styled-components'
import videoTrailer from '../assets/videoTrailer.mp4'
import {BsPlayCircleFill,BsDot} from 'react-icons/bs'
import {AiFillDislike, AiFillLike,AiOutlinePlus, AiOutlineClose} from 'react-icons/ai'
import {MdKeyboardArrowDown} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { addLikedMovie, removeLikedMovie } from '../store'


export default function Tag({movie, remove}) {
    const [showTag,setShowTag] = useState(false);
    const [email,setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
          setEmail(currentUser.email);
        } else navigate("/login");
      });

    return (
        <Container>
            <div className='tag'>
                <img 
                    src={`https://image.tmdb.org/t/p/w500/${movie.image}`}
                    onMouseEnter= {()=>{setShowTag(true)}}
                />
                    <div 
                        className={`SubTag flex column ${showTag?'show':'hide'}`}
                        onMouseLeave = {()=>{setShowTag(false)}}
                        onBlur = {()=>{setShowTag(false)}}>

                        <video src={videoTrailer} autoPlay muted loop onClick={()=>{navigate('/Player')}}/>
                        <div className='info flex column j-between'>
                            <div className="name">{movie.name}</div>
                            <div className="button flex j-between a-center">
                                <div className="flex a-center">
                                    <BsPlayCircleFill className='btn1'onClick={()=>{navigate('/Player')}}/>
                                    <AiFillLike className='btn1'/>
                                    <AiFillDislike className='btn1'/>
                                    {(!remove)
                                        ?<AiOutlinePlus className='btn1' onClick={()=>{dispatch(addLikedMovie({email: email, movie: movie}))}}/>
                                        :<AiOutlineClose className='btn1'onClick={()=>{dispatch(removeLikedMovie({email: email, movie: movie}))}}/>
                                    }
                                </div>
                                <MdKeyboardArrowDown className='btn2'/>
                            </div>
                            <div className="genres flex a-center">
                                {
                                    movie.genres.map((e,i)=>
                                        <div key={i} className="flex a-center">
                                            <div key={i}>{e.name}</div>
                                                {  
                                                ((i+1)!=movie.genres.length)
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
        </Container>
    )
}

const Container = styled.div`
    .tag{
        position: relative;
        img{
            max-width: 190px;
            margin-right: 30px;
        }
        .show{
            transition: 10s ease-in-out;
            visibility: visible;
        }
        .hide{
            visibility: hidden;
        }
        .SubTag{
            background-color: black;
            border-radius: 0.5rem;
            box-shadow: 2rem;
            width: 16rem;
            height: 200%;
            position: absolute;
            z-index: 6;
            bottom: 0;
            left: 0;
            video{
                width: 100%;
                height: 50%;
                margin: 0;
            }
            .info{
                background-color: rgba(226, 217, 217, 0.171);
                width: 100%;
                height: 50%;
                padding: 0.5rem 0.8rem 0.8rem 0.8rem;
                .button{
                    font-size: 1.5rem;
                    .btn1{
                        margin-right: 0.4rem;
                    }
                    .btn1,.btn2{
                        cursor: pointer;
                    }
                }
                .name{
                    font-weight: 600;
                }
                .genres{
                    font-size: 0.8rem;
                    flex-wrap: wrap;
                    div{
                        line-height: 100%;
                    }
                }
            }
        }        
    }
`
