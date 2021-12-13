import { useEffect, useState } from 'react';
import { authService } from "../services/auth-service";

export const useAuth = () => {
  const [isAuthenticated, setAuth] = useState(false)
  const [loading, toggleLoading] = useState(true)//通信の入り、終わりを作れるようになる

  useEffect(() => { 
            authService.checkAuth()
            .then((isAuthResult) => {
                      if(!isAuthResult) {
                                setAuth(false)
                                toggleLoading(false)
                      }
                      setAuth(true)
                      toggleLoading(false)
            }).catch(err => {
                      setAuth(false)
                      toggleLoading(false)
            })//true or false
  },[])
  return [isAuthenticated, loading]
}