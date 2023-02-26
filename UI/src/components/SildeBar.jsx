import React from 'react'
import styled from 'styled-components'
import TagSlide from '../components/TagSlide'

export default function SildeBar({movies}) {
    const getmovie = (start,end) =>{
        return movies.slice(start,end)
    }
    
    return (
        <Container>
            <div className='flex column j-between'>
                <TagSlide movies={getmovie(1,10)} title={'Trending'}/>
                <TagSlide movies={getmovie(10,20)} title={'New Releases'}/>
                <TagSlide movies={getmovie(20,30)} title={'Horror'}/>
                <TagSlide movies={getmovie(30,40)} title={'Action'}/>
            </div>
        </Container>
    )
}

const Container = styled.div`
    background-color: black;
    
`