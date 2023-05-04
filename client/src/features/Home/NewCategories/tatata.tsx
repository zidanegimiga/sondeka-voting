import { useRef } from 'react';

export function MyComponent() {
  const myRef = useRef(null);

  const handleClick = () => {
    console.log(myRef);
    myRef.current.style.backgroundColor = 'white'
    myRef.current.style.setProperty('--bg-color', 'red')
  }

  const arr = [1,2,3,4,5,6,7,8,9]

  return (
    <div className="wapi" ref={myRef} onClick={handleClick}>
      {
        arr.map((item, index) =>(
          <div key={index}>
          My Component
        </div>
        ))
      }
    </div>
  )
}