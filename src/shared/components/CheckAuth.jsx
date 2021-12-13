import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth'

export const CheckAuth = ({ children }) => {
          //handleAuth的コードを書く
          const [isAuthenticated, loading] = useAuth();
          let location = useLocation()
          console.log('hello from checkAuth', location)

          if(loading) return<div>loading...</div>

          if(!isAuthenticated) return <Navigate to="/signin" state={{ from: location}} />;
          return children
}
// 挟まれたものがpropsに入れられる(CheckAuthはfunctionやから)
//propsの代わりに{ children }でも可(object distraction)