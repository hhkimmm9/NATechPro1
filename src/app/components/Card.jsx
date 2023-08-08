import React from 'react'
import Image from 'next/image'

const Card = ({ imgSrc }) => {
  return (
    <>
      <Image src={imgSrc} alt='Card Image' width={384} height={288}
        className='object-contain shadow w-96 h-72'
      />
    </>
  )
}

export default Card