import React from 'react'
import Header from './Header'
import Generos from './Generos'
import NovoGenero from './NovoGenero'
import EditarGenero from './EditarGenero'
import Series from './Series'
import NovaSerie from './NovaSerie'
import InfoSerie from './InfoSerie'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'


const Home = () => {
  return <h1>Home</h1>
}

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
            <Route path='/' exact Component={Home} />
            <Route path='/generos/:id' exact Component={EditarGenero} />
            <Route path='/generos/novo' exact Component={NovoGenero} />
            <Route path='/generos' exact Component={Generos} />
            <Route path='/series' exact Component={Series} />
            <Route path='/series/novo' exact Component={NovaSerie} />
            <Route path='/series/:id' exact Component={InfoSerie} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
