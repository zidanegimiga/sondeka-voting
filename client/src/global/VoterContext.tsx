import { useContext, createContext, useState } from "react";

// @ts-ignore - Default value is not needed here
const VoterContext = createContext();

const VoterProvider = ({children}) =>{
  const [userId, setUserId] = useState("")
  const [userName, setUserName] = useState("")
  const [nomineeModalData, setNomineeModalData] = useState({})

  return(
    <VoterContext.Provider value={{userId, setUserId, nomineeModalData, setNomineeModalData}}>
      {children}
    </VoterContext.Provider>
  )
}

export { VoterContext, VoterProvider }