import Image from 'next/image'
import React from 'react'

const MishiKhalid = ({image}) => {
  return (
    <div>
        <Image src={image} width={40} height={80} alt="Mishi Khalid's work"/>
    </div>
  )
}

export default MishiKhalid