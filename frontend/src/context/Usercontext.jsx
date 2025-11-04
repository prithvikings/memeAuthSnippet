import React from 'react'
import { createContext } from 'react';
export const dataContext = createContext();


const Usercontext = ({children}) => {

    const value={
        name:"Prithvi",
        email:"prithviraj"
    }

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  )
}

export default Usercontext