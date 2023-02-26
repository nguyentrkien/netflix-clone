import React, { useEffect, useState} from 'react'
import styled from 'styled-components'
import Tag from '../components/Tag'
import NavBar from '../components/NavBar'
import axios from 'axios'
import {onAuthStateChanged} from "firebase/auth"
import { firebaseAuth } from '../ultis/firebase-config'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getLikedMovie } from '../store'

export default function Movies() {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies);
    const getLikedMovies = useSelector((state) => state.getLikedMovies);
    const [email,setEmail] = useState(undefined);
    const navigate = useNavigate();
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
          setEmail(currentUser.email);
        } else navigate("/login");
      });
    useEffect(()=>{
        window.scrollTo(0, 0)
        if (email)
            try {
                dispatch(getLikedMovie({email: email}))
            } catch(err){
                console.log(err)
            }
    },[email])

    return (
        <Container>
            <NavBar blur={false} tab={'My List'}/>
            <div className='content'>
            <div className='title'> My List </div>
            {(getLikedMovies)
                ?<>
                <div className="flex list">
                    {   movies.map((e,i)=>{
                            return <Tag movie={e} key={i} remove={true}/>
                        })}
                    </div>
                </>
                :<></>}
            </div>
        </Container>
    )
}

const Container = styled.div`
    .content{
        padding-top: 5rem;
    }
    .title{
        font-weight: 700;
        font-size: 1.5rem;
        margin: 1rem 2rem;
        padding: 0 1rem;
    }
    .list{
        gap: 1.5rem 0.1rem;
        margin: 0 1rem;
        flex-wrap: wrap;
    }
`