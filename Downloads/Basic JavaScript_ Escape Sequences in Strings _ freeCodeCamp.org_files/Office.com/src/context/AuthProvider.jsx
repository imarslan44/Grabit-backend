import React, { createContext, useState } from 'react'
import { useEffect } from 'react'
import {getLocalStorage} from './localStorage'

export const AuthContext = createContext()

function AuthProvider({children}) {
1
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    
    const {employees, admins} = getLocalStorage()
    setUserData({employees,admins})
  },[])
  
 
  return (
    <div>
      <AuthContext.Provider value={userData}>
        
      {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthProvider