import React from 'react'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href='/'>
      <div className="text-neutral-600 text-xl p-1 font-bold">mosPic</div>
    </Link>
  )
}

export default Logo