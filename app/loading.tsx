import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='grid place-items-center h-screen'>
      <Image width={250} height={250} src={'/loading.webp'} alt='loading...'/>
    </div>
  )
}

export default Loading

