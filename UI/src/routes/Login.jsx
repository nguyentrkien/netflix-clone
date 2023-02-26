import React, { useState } from 'react'
import styled from 'styled-components'
import Background from '../components/Background'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import {signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import { firebaseAuth } from '../ultis/firebase-config'

export default function Signup() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    })
    const handleLogIn = async () => {
        try{
            const {email, password} = formValues;
            await signInWithEmailAndPassword(firebaseAuth,email,password)
        } catch(e){
            console.log(e);
        }
    }

    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(currentUser) navigate("/")
    })

    return (
    <Container >
        <Background/>
        <Header login={false}/>
        <div className='content flex a-center column'>
            <div className='form flex a-center column j-evenly'> 
              <div className='text'>Login </div>
              <input 
                type='email' 
                placeholder='Email address' 
                onChange={(e)=>{
                  setFormValues({
                    ...formValues,
                    [e.target.type]: e.target.value
                  })
                }}
              />
              <input 
                type='password' 
                placeholder='Password' 
                onChange={(e)=>{
                  setFormValues({
                    ...formValues,
                    [e.target.type]: e.target.value
                  })
                }}
              />
              <button className='btn' onClick={handleLogIn}>Log In</button>
            </div>
         </div>
    </Container>
    )
}

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    .text{
        font-size: 18px;
        font-weight: bold;
    }
    .content{
        width: 100vw;
        height: 100vh;
        padding-top: 240px;
    }
    .form{
      background-color: rgba(0,0,0,0.8);
      max-width: 1000px;
      border-radius: 10px;
      min-height: 15rem;
      min-width: 25rem;
      .btn{
        min-width: 15rem;
        padding: 8px 20px;
      }
    }
    input{
        min-width: 15rem;
        font-size: 14px;
        padding: 0.5rem;
        border: 1px black solid;
    }
    .btn{
        font-size: 16px;
        border: none;
        border-radius: 5px;
        background-color: red;
        color: white;
        font-weight: bold;
        padding: 10px 20px;
        max-height: 40px;
        cursor: pointer;
    }
    
`;

