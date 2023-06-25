import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";

function App() {

  return (

    <BrowserRouter>
      <div className='App'>
      <Routes>
        <Route path="/" element={<><Navbar/><Tasks/></>}/>
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
