import { async } from '@firebase/util'
import {configureStore, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { API_KEY, TMDB_URL } from '../ultis/themoviedb'

const initialState ={
    getGenres: [],
    getGenresLoaded: false,
    getLikedMovies: false,
    movies: [],
    search: [],
}

export const getGenres = createAsyncThunk("Netflix/getGenres",
    async ({type}) => {
        const {data:{genres}}= await axios.get(`${TMDB_URL}/genre/${type}/list?api_key=${API_KEY}`)
        return genres
    }
)

export const addLikedMovie = createAsyncThunk("Netflix/addLiked",
    async ({email, movie})=>{
        try{
            const {data} = await axios.post("http://localhost:5000/likedMovies",{
                email,
                data: movie,
            })
            console.log(data.msg)
        } catch (err){
            console.log(err)
            } 
        }
)

export const removeLikedMovie = createAsyncThunk("Netflix/removeLiked",
    async ({email, movie})=>{
        try{
            const {data} = await axios.put("http://localhost:5000/unlikedMovies",{
                email,
                movieId: movie.id,
            })
            console.log(data.msg)
            return data.movies
        } catch (err){
            console.log(err)
        }
    } 
)

export const getLikedMovie = createAsyncThunk("Netflix/getLiked",
    async ({email}) => {
        try{
            const {data} = await axios.get(`http://localhost:5000/getLikedMovies/${email}`)
            console.log(data)
            if (data.msg == "Success")
                return data.movies
            else return false
        } catch(err){
            console.log(err)
        }
    } 
)

export const getTrendingMovie = createAsyncThunk("Netflix/trending",
    async (data, thunkAPI) => {
        const {getGenres,} = thunkAPI.getState();
        const moviesArray = [];
        for (var i = 1; i < 3 ; i++){
            const {data: {results}} = await axios.get(`${TMDB_URL}/trending/all/week?api_key=${API_KEY}&page=${i}`)
            results.forEach(element => {
                const genresArray = []
                element.genre_ids.forEach(element=>{
                    const name = getGenres.find(({id})=>id===element)
                    if (name) genresArray.push(name)
                })
                moviesArray.push({
                    id: element.id,
                    name: element.original_title?element.original_title:element.original_name,
                    image: element.backdrop_path,
                    genres: genresArray,
                })
            });
        }
        return moviesArray
    }
)

export const getDatabyGenres = createAsyncThunk("Netflix/genres",
    async ({genres, type}, thunkAPI) => {
        const {getGenres,} = thunkAPI.getState();
        const moviesArray = [];
        for (var i = 1; i < 3 ; i++){
            const {data: {results}} = await axios.get(`${TMDB_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genres}`)
            results.forEach(element => {
                const genresArray = []
                element.genre_ids.forEach(element=>{
                    const name = getGenres.find(({id})=>id===element)
                    if (name) genresArray.push(name)
                })
                moviesArray.push({
                    id: element.id,
                    name: element.original_title?element.original_title:element.original_name,
                    image: element.backdrop_path,
                    genres: genresArray,
                })
            });
        }
        return moviesArray
    }
)

export const searchMovie = createAsyncThunk("Netflix/search-movies",
    async({querry}, thunkAPI)=>{
        const {getGenres,} = thunkAPI.getState();
        const rawMoviesArray = [];
        for (var i = 1; i < 2 ; i++){
            const {data: {results}} = await axios.get(`${TMDB_URL}/search/movie?api_key=${API_KEY}&query=${querry}`)
            results.forEach(element => {
                const genresArray = []
                element.genre_ids.forEach(element=>{
                    const name = getGenres.find(({id})=>id===element)
                    if (name) genresArray.push(name)
                })
                rawMoviesArray.push({
                    id: element.id,
                    name: element.original_title?element.original_title:element.original_name,
                    image: element.poster_path,
                    genres: genresArray,
                    release_date: element.release_date,
                    overview: element.overview,
                    rating: element.vote_average,
                })
            });
        }
        const moviesArray = rawMoviesArray.sort(
            (p1, p2) => (p1.release_date < p2.release_date) ? 1 : (p1.release_date > p2.release_date) ? -1 : 0);
        return moviesArray
        }
    )

export const searchTvShows = createAsyncThunk("Netflix/search-tvshows",
    async({querry}, thunkAPI)=>{
        const {getGenres,} = thunkAPI.getState();
        const rawTvShowArray = [];
        for (var i = 1; i < 2 ; i++){
            const {data: {results}} = await axios.get(`${TMDB_URL}/search/tv?api_key=${API_KEY}&query=${querry}`)
            results.forEach(element => {
                const genresArray = []
                element.genre_ids.forEach(element=>{
                    const name = getGenres.find(({id})=>id===element)
                    if (name) genresArray.push(name)
                })
                rawTvShowArray.push({
                    id: element.id,
                    name: element.original_title?element.original_title:element.original_name,
                    image: element.poster_path,
                    genres: genresArray,
                    release_date: element.first_air_date,
                    overview: element.overview,
                    rating: element.vote_average,
                })
            });
        }
        const TvShows = rawTvShowArray.sort(
            (p1, p2) => (p1.release_date < p2.release_date) ? 1 : (p1.release_date > p2.release_date) ? -1 : 0);
        return TvShows
        }
    )

export const searchPerson = createAsyncThunk("Netflix/search-person",
    async({querry})=>{
        const rawActorArray = [];
        for (var i = 1; i < 2 ; i++){
            const {data: {results}} = await axios.get(`${TMDB_URL}/search/person?api_key=${API_KEY}&query=${querry}`)
            results.forEach(element => {
                const knowForArray = []
                element.known_for.forEach(element=>{
                    knowForArray.push(element.title)
                })
                rawActorArray.push({
                    name: element.name?element.name:element.original_name,
                    gender: element.gender,
                    image: element.profile_path,
                    popularity: element.popularity,
                    knowFor: knowForArray,
                    knowForDepartment: element.known_for_department,
                })
            });
        }
        const actorArray = rawActorArray.sort(
            (p1, p2) => (p1.popularity < p2.popularity) ? 1 : (p1.popularity > p2.popularity) ? -1 : 0);
        console.log(actorArray)
        return actorArray
        }
    )

const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(getGenres.fulfilled,(state,action)=> {
            state.getGenres = action.payload
            state.getGenresLoaded = true
        })
        builder.addCase(getTrendingMovie.fulfilled,(state,action)=> {
            state.movies = action.payload
        })
        builder.addCase(getDatabyGenres.fulfilled,(state,action)=> {
            state.movies = action.payload
        })
        builder.addCase(searchMovie.fulfilled,(state,action)=> {
            state.search[0] = action.payload
        })
        builder.addCase(searchTvShows.fulfilled,(state,action)=> {
            state.search[1] = action.payload
        })
        builder.addCase(searchPerson.fulfilled,(state,action)=> {
            state.search[2] = action.payload
        })
        builder.addCase(addLikedMovie.fulfilled,(state,action)=> {
        })
        builder.addCase(removeLikedMovie.fulfilled,(state,action)=> {
            state.movies = action.payload
        })
        builder.addCase(getLikedMovie.fulfilled,(state,action)=> {
            if (action.payload){
                state.movies = action.payload
                state.getLikedMovies = true
            }
            else state.getLikedMovies = false
        })
    },
}) 

export const netflix = configureStore({
    reducer: NetflixSlice.reducer
})



