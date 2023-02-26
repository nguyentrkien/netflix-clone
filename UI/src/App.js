import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './routes/Home'
import Login from './routes/Login'
import Signup from './routes/Signup'
import NoPage from './routes/NoPage'
import Mylist from './routes/Mylist';
import Movies from './routes/Movies';
import TVShows from './routes/TVShows';
import Player from './routes/Player';
import Search from './routes/Search';
import { Provider } from 'react-redux';
import { netflix } from './store';

function App() {
  return (
    <Provider store={netflix}>
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="Movies" element={<Movies />} />
          <Route path="TVShows" element={<TVShows />} />
          <Route path="Mylist" element={<Mylist />} />
          <Route path="Player" element={<Player />} />
          <Route path="Search" element={<Search />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
