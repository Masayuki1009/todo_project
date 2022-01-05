// import './App.css';

//component書く
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { Landing } from './components/Landing'
import { Signin } from './components/Signin'
import { CheckAuth } from './shared/components/CheckAuth'
import "./App.css"

//component base
export const App = () => {
  return (
  <div>
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
      path="/home"
      element={
      <CheckAuth>
      <Home />
      </CheckAuth>
      }
      />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  </Router>
  </div>
  )
}


