import React from 'react'
import Image from 'next/image'

const Card = ({ imgSrc }: { imgSrc: string }) => {
  return (
    <div className='shadow'>
      {/* <Image src={imgSrc} alt='' width={200} height={200} /> */}
      <img src={imgSrc} alt="Background  Images" className='object-cover w-96 h-52' />
    </div>
  )
}

export default Card