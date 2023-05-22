import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// @ts-ignore - Default value is not needed here
const VoterContext = createContext();

const VoterProvider = ({children}) =>{
  const [nomineeModalData, setNomineeModalData] = useState({})

  return(
    <VoterContext.Provider value={{ nomineeModalData, setNomineeModalData}}>
      {children}
    </VoterContext.Provider>
  )
}

export { VoterContext, VoterProvider }