import { useState } from 'react'
import './App.css'
import {Router, Routes, Route} from "react-router-dom";
import header from "./components/header";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<header/>}/>
      </Routes>
    </Router>
  )
}

export default App
