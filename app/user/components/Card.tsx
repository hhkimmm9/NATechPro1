import React from 'react'
import Image from 'next/image'

const Card = ({ imgSrc }: { imgSrc: string }) => {
  return (
    <>
      <Image src={imgSrc} alt='' width={1920} height={1080} className='object-cover' />
    </>
  )
}

export default Card