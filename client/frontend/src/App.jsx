import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from "./components/Navbar";

function App() {

  return (

    <BrowserRouter>
      <div className='App'>
      <Routes>
        <Route path="/" element={<Navbar/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
