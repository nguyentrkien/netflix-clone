import React, { useState } from 'react'
import styled from 'styled-components'
import Background from '../components/Background'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import { firebaseAuth } from '../ultis/firebase-config'

export default function Signup() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    })
    const handleSignIn = async () => {
        try{
            const {email, password} = formValues;
            await createUserWithEmailAndPassword(firebaseAuth,email,password)
        } catch(e){
            console.log(e);
        }
    }

    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(currentUser) navigate("/")
    })

    return (
    <Container>
        <Background/>
        <Header login={true}/>
        <div className='content'>
            <div className='text column flex a-center'>
                <h1>Unlimited movies, TV shows and more</h1>
                <h4>Watch anywhere. Cancel anytime.</h4>
                <h6>Ready to watch? Enter your email to create or restart membership</h6>
            </div>
            <div className='form flex column a-center'>
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


                <button className='btn' onClick={handleSignIn}>Sign up</button>
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
        font-size: 24px;
    }
    .content{
        width: 100vw;
        height: 100vh;
        padding-top: 120px;
    }
    .form{

    }
    input{
        min-width: 500px;
        font-size: 18px;
        padding: 0.5rem;
        border-radius: 5px;
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

