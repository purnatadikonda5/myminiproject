import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { AppRoutes } from './routes/AppRoutes'
import { UserProvider } from './contexts/user.context'

function App() {
  return (
    <UserProvider>
      <AppRoutes/>
    </UserProvider>
  )
}

export default App

