import React, {useEffect, useState} from 'react'
import Header from './Header'
import Generos from './Generos'
import NovoGenero from './NovoGenero'
import EditarGenero from './EditarGenero'

import axios from 'axios'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'


const Home = () => {
  return <h1>Home</h1>
}

function App() {
 const [data, setData ]  = useState({})

 useEffect( () => {
    axios.get('/api').then(res => {
      setData(res.data)
    })
 },[])

  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/generos/:id' exact Component={EditarGenero} />
          <Route path='/generos/novo' exact Component={NovoGenero} />
          <Route path='/generos' exact Component={Generos} />
        </Routes>
       <pre>{ JSON.stringify(data) }</pre>
      </div>
    </Router>
  );
}

export default App;
