import { createContext, useEffect, useState } from "react";

const UserContext = createContext()

function UserContextProvider({children}) {
  
  const [usuario, setUsuario] = useState({})

  useEffect(() => {
    setUsuario({
      name: "Jorge Flores",
      registered: "05/Enero/2026"
    })
  }, [])

  return (
    <UserContext.Provider value={usuario}>
      {children}
    </UserContext.Provider>
  )
}

export {UserContext, UserContextProvider}