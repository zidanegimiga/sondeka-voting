import React, { useEffect, useState} from 'react'

const Test = () => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        fetch('https://sondeka-voting-api.cyclic.app/json')
        .then( res => res.json())
        .then( data => setData(data))
        .catch(err => {
            console.log(err.message)
        })        
    }, [])

    console.log(data)
  return (
    <div>test
        {            
        }
    </div>
  )
}

export default Test