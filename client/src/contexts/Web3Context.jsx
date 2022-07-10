import React, { createContext, useCallback, useState } from 'react'

import { useNavigate } from 'react-router-dom'

export const Web3Context = createContext({})

export const Web3Provider = ({ children }) => {
  const navigate = useNavigate()

  const [user, setUser] =
    useState <
    UserProps >
    (() => {
      const userLocalStorage = localStorage.getItem('@athenaz:user')

      if (userLocalStorage) {
        const userData = JSON.parse(userLocalStorage)
        api.defaults.headers.authorization = `Bearer ${userData.token}`

        return userData
      }

      return {}
    })

  const isAuthenticated = !!user.token

  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false)

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response =
        (await api.post) <
        UserProps >
        ('/auth/login',
        {
          email,
          password
        })

      const {
        data: { token }
      } = response

      if (token) {
        api.defaults.headers.authorization = `Bearer ${token}`

        const userResponse = await api.get('/user/me')

        const userData = {
          ...userResponse.data,
          token
        }

        // Save user on browser local storage
        localStorage.setItem('@athenaz:user', JSON.stringify(userData))

        setUser(userData)

        return userData
      }
    } catch (err) {
      if (err.response?.data) {
        const {
          response: { data }
        } = err

        if (data) return data
      }

      return {
        statusCode: 500,
        error: 'Erro ao realizar login',
        message:
          'Tivemos um problema ao processar sua requisição. Nosso time já está resolvendo o problema!'
      }
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      localStorage.removeItem('@athenaz:user')
      localStorage.removeItem('@athenaz:clinic')
      navigate('/')
      setUser({})
    } catch (err) {
      console.error(err)
    }
  }, [setUser, navigate])

  return (
    <Web3Context.Provider
      value={{
        user,
        isAuthenticated,
        signOut,
        signIn,
        isLoadingDashboard,
        setIsLoadingDashboard
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}
